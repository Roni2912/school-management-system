// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Load environment variables for testing
require('dotenv').config({ path: '.env.local' })

// Add testing library jest-dom matchers
import '@testing-library/jest-dom'

// Mock TextEncoder/TextDecoder for Node.js environment
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder