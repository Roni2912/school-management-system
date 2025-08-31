# School Management System

A modern school management system built with Next.js 14, React, and MySQL that allows users to add schools to a database and view them in an elegant, responsive interface.

## Features

- **Add Schools**: User-friendly form with comprehensive validation
- **View Schools**: Elegant grid layout displaying school information
- **Image Upload**: Support for school images with optimization
- **Responsive Design**: Mobile-first approach with Google-level UI quality
- **Modern Stack**: Next.js 14, React Hook Form, Zod validation, MySQL

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Forms**: React Hook Form with Zod validation
- **Database**: MySQL with connection pooling
- **Image Handling**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd school-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Set up the MySQL database:
```sql
CREATE DATABASE school_management;
USE school_management;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
school-management-system/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── add-school/         # Add school page
│   │   ├── schools/            # View schools page
│   │   ├── api/                # API routes
│   │   │   ├── schools/        # School CRUD operations
│   │   │   └── upload/         # File upload handling
│   │   ├── globals.css         # Global styles and theme
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── SchoolForm.tsx      # School form component
│   │   ├── SchoolCard.tsx      # School display component
│   │   └── Navigation.tsx      # Navigation component
│   └── lib/                    # Utilities and configurations
│       ├── db.ts               # Database connection
│       ├── validations.ts      # Zod schemas
│       └── utils.ts            # Helper functions
├── public/
│   └── schoolImages/           # Uploaded school images
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `` |
| `DB_NAME` | Database name | `school_management` |
| `DB_PORT` | MySQL port | `3306` |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | `http://localhost:3000` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.