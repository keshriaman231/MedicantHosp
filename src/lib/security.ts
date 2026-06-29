/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Security utilities for input validation, sanitization, and XSS prevention.
 * Designed to secure all patient-facing and outpatient forms.
 */

/**
 * Escapes special characters to prevent HTML injection / XSS.
 * Note: React naturally escapes strings in JSX, but this is a defensive measure
 * for database storage and any potential raw rendering paths.
 */
export function escapeHTML(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips HTML tags entirely and escapes characters to sanitize text inputs.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  // Strip HTML tags using regex
  const stripped = input.replace(/<[^>]*>/g, '');
  // Trim and escape remaining content
  return escapeHTML(stripped.trim());
}

/**
 * Strict email validation using standard regex pattern.
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 100;
}

/**
 * Phone number validation supporting international and Indian formats (+91, etc.)
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  // Allow numbers, spaces, dashes, parentheses and a leading plus sign
  const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Name validation supporting letters, spaces, common punctuation, and Indian honorifics.
 */
export function validateName(name: string): boolean {
  if (!name) return false;
  // Prevent long strings, empty inputs, or characters associated with script tags or SQL injection attempts
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 80) return false;
  // Allow letters, numbers, spaces, dots, and hyphens (no quotes, angles, or semi-colons)
  const nameRegex = /^[a-zA-Z0-9\s.\-()]+$/;
  return nameRegex.test(trimmed);
}

/**
 * Age validation to ensure realistic ranges and prevent negative/overflow numbers.
 */
export function validateAge(age: number | string): boolean {
  const num = typeof age === 'number' ? age : parseInt(age, 10);
  return !isNaN(num) && num >= 0 && num <= 125;
}

/**
 * General validation for message content (e.g. enquiries, messages).
 * Prevents extremely long payloads or weird binary blocks.
 */
export function validateMessage(message: string, maxLength = 2000): boolean {
  if (!message) return false;
  const len = message.trim().length;
  return len > 0 && len <= maxLength;
}

interface RateLimitResult {
  allowed: boolean;
  timeLeftSeconds?: number;
  remainingRequests: number;
}

/**
 * Sliding Window rate limiting utility utilizing client storage.
 * Secures client-side flow against rapid automated spam submissions.
 * 
 * @param actionKey Unique action name (e.g. 'appointment', 'contact')
 * @param limit Max allowed requests within window
 * @param windowMs Time window duration in milliseconds (e.g. 600000 for 10 minutes)
 */
export function checkRateLimit(actionKey: string, limit: number, windowMs: number): RateLimitResult {
  try {
    const now = Date.now();
    const storageKey = `mhr_rate_limit_${actionKey}`;
    const rawData = localStorage.getItem(storageKey);
    let timestamps: number[] = [];
    
    if (rawData) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        // Keep only timestamps within the active time window
        timestamps = parsed.filter((t: number) => typeof t === 'number' && now - t < windowMs);
      }
    }
    
    if (timestamps.length >= limit) {
      const oldest = timestamps[0];
      const timeLeftMs = (oldest + windowMs) - now;
      const timeLeftSeconds = Math.max(1, Math.ceil(timeLeftMs / 1000));
      return {
        allowed: false,
        timeLeftSeconds,
        remainingRequests: 0
      };
    }
    
    // Log active request
    timestamps.push(now);
    localStorage.setItem(storageKey, JSON.stringify(timestamps));
    
    return {
      allowed: true,
      remainingRequests: limit - timestamps.length
    };
  } catch (error) {
    console.warn('LocalStorage unavailable. Bypassing client-side rate limit check safely.', error);
    return { allowed: true, remainingRequests: 1 };
  }
}

/**
 * Server-side rate limiting script guidance for database administrator:
 * Run this SQL script in your Supabase SQL editor to enable database-level
 * (server-side) rate limiting for appointments to prevent bulk automated inserts.
 * 
 * CREATE OR REPLACE FUNCTION limit_appointments_by_ip_email()
 * RETURNS TRIGGER AS $$
 * DECLARE
 *   recent_count INT;
 * BEGIN
 *   -- Count bookings by email in the last 10 minutes
 *   SELECT COUNT(*) INTO recent_count
 *   FROM appointments
 *   WHERE patient_email = NEW.patient_email
 *     AND created_at > NOW() - INTERVAL '10 minutes';
 * 
 *   IF recent_count >= 3 THEN
 *     RAISE EXCEPTION 'Rate limit exceeded. Maximum 3 appointments per 10 minutes per email.';
 *   END IF;
 * 
 *   RETURN NEW;
 * END;
 * $$ LANGUAGE plpgsql SECURITY DEFINER;
 * 
 * CREATE TRIGGER tr_limit_appointments
 * BEFORE INSERT ON appointments
 * FOR EACH ROW EXECUTE FUNCTION limit_appointments_by_ip_email();
 */
