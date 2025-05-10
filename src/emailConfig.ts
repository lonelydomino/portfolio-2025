// EmailJS configuration
// Sign up at https://www.emailjs.com and replace these with your actual values

// Error: "App.tsx:629 Error sending email: The Public Key is invalid"
// To fix this error, you need to:
// 1. Sign up or log in to EmailJS at https://dashboard.emailjs.com
// 2. Go to https://dashboard.emailjs.com/admin/account to find your Public Key
// 3. Create a service (Gmail/Outlook/etc.) at https://dashboard.emailjs.com/admin/services
// 4. Create an email template at https://dashboard.emailjs.com/admin/templates
//    - Make sure to include variables: {{from_name}}, {{reply_to}}, {{message}}, {{to_email}} in your template

export const EMAILJS_SERVICE_ID = 'service_lnef6w8'; // e.g., 'service_a1b2c3d'
export const EMAILJS_TEMPLATE_ID = 'template_41jwu5h'; // e.g., 'template_x1y2z3'
export const EMAILJS_PUBLIC_KEY = 'l4YBQGqZBgchFUSG7'; // e.g., 'ABCDEF1234567890'

// IMPORTANT: After setting up EmailJS:
// 1. Replace the placeholder values above with your actual EmailJS credentials
// 2. Your template should use variables matched to your form field names:
//    - from_name: For the sender's name
//    - reply_to: For the sender's email
//    - message: For the email content
//    - to_email: For the recipient email (optional if set in template)

// Note: After setting up an EmailJS account, you'll need to create:
// 1. A service (e.g., Gmail)
// 2. An email template with variables: from_name, reply_to, message
// 3. Use the public key from your EmailJS account dashboard 