export interface PasswordRule {
    id: string;
    label: string;
    test: (pw: string) => boolean;
}

/** Rules that must ALL pass before a password is accepted. */
export const PASSWORD_RULES: PasswordRule[] = [
    { id: 'len',     label: 'At least 8 characters',               test: pw => pw.length >= 8 },
    { id: 'upper',   label: 'One uppercase letter (A–Z)',           test: pw => /[A-Z]/.test(pw) },
    { id: 'lower',   label: 'One lowercase letter (a–z)',           test: pw => /[a-z]/.test(pw) },
    { id: 'num',     label: 'One number (0–9)',                     test: pw => /[0-9]/.test(pw) },
    { id: 'special', label: 'One special character (!@#$%^&* …)',   test: pw => /[^A-Za-z0-9]/.test(pw) },
];

/**
 * Returns the first failing rule's human-readable message, or null when all rules pass.
 * Used on both frontend and backend so the rule definitions are the single source of truth.
 */
export function validatePassword(pw: string): string | null {
    if (pw.length < 8)              return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(pw))          return 'Password must include at least one uppercase letter.';
    if (!/[a-z]/.test(pw))          return 'Password must include at least one lowercase letter.';
    if (!/[0-9]/.test(pw))          return 'Password must include at least one number.';
    if (!/[^A-Za-z0-9]/.test(pw))   return 'Password must include at least one special character (!@#$%^&* etc.).';
    return null;
}

/** Returns true only when every required rule passes. */
export function isPasswordValid(pw: string): boolean {
    return validatePassword(pw) === null;
}

export interface PasswordStrength {
    score: number;        // 0–6
    label: 'Weak' | 'Fair' | 'Strong';
    color: string;        // Tailwind bg-* class
    textColor: string;    // Tailwind text-* class
}

/**
 * Scoring (0–6):
 *   +1  length ≥ 8
 *   +1  length ≥ 12  (bonus)
 *   +1  uppercase present
 *   +1  lowercase present
 *   +1  number present
 *   +1  special char present
 */
export function getPasswordStrength(pw: string): PasswordStrength {
    let score = 0;
    if (pw.length >= 8)             score++;
    if (pw.length >= 12)            score++;
    if (/[A-Z]/.test(pw))           score++;
    if (/[a-z]/.test(pw))           score++;
    if (/[0-9]/.test(pw))           score++;
    if (/[^A-Za-z0-9]/.test(pw))    score++;

    if (score <= 2) return { score, label: 'Weak',   color: 'bg-red-500',     textColor: 'text-red-500' };
    if (score <= 4) return { score, label: 'Fair',   color: 'bg-accent-two',  textColor: 'text-accent-two' };
    return          { score, label: 'Strong', color: 'bg-secondary',   textColor: 'text-secondary' };
}
