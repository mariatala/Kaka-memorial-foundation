export const SECURITY_QUESTIONS = [
    'What was your childhood nickname?',
    'What is the name of your first pet?',
    'What city were you born in?',
    "What is your mother's maiden name?",
    'What was the name of your elementary school?',
    'What was the make and model of your first car?',
    'What street did you grow up on?',
    "What is your oldest sibling's middle name?",
] as const;

export type SecurityQuestion = (typeof SECURITY_QUESTIONS)[number];
