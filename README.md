# EduFlow
## 1. Overview

### 1.1 Purpose
EduFlow is a web-based marks and student management system designed to simplify academic record handling for educational institutions. The system enables administrators to manage student data, record marks, compute Grade Point Average (GPA), and generate academic certificates such as marksheets and transcripts. The goal is to minimize manual errors and automate repetitive academic processes.

The project serves as an improved and well-engineered version of a real client application developed earlier, focusing on better design, scalability, and modern development practices.

### 1.2 Scope
EduFlow serves as a centralized portal for schools and colleges to manage student information and assessment data. The initial release focuses on single-admin usage, with an optional AI module powered by **Gemini API** for generating performance insights, reports, and certificates.  
Future versions will support multi-role systems (teachers, students, parents).

---

## 2. Users and Roles

| Role | Description | Permissions |
|------|--------------|-------------|
| **Admin** | Manages schools, students, classes, exams, marks, and certificate generation. | Full CRUD access and report generation. |

*Future enhancement:* Additional roles like Teacher and Student.

---

## 3. Core Features

1. **Student Management**  
   Add, update, delete, and view student details.

2. **Class and Subject Management**  
   Define school classes and assign subjects with credit hours.

3. **Exam Management**  
   Create exams and set subject-level configurations (full marks, pass marks).

4. **Marks Entry and GPA Calculation**  
   Record marks, calculate GPA according to NEB (National Examination Board, Nepal) standards.

5. **Marksheet Generation**  
   Generate printable marksheets containing student details, marks, and GPA.

6. **Certificate Generation**  
   Generate certificates in PDF format.

7. **Authentication**  
   Secure admin login with session handling and hashed credentials.

8. **Search and Reporting**  
   Query student marks and GPA by class, year, or exam.

---

### 4. Technology Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui |
| **Backend** | Prisma ORM, Server Actions |
| **Database** | PostgreSQL |
| **Authentication** | JWT |
| **Deployment** | Vercel + Supabase |

---

## 5. Future Enhancements

- Multi-role system (Teacher, Student, Parent)
- Advanced analytics (GPA distribution graphs)
- AI integration

---

## 6. Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

Binayak Niraula  
*Date:* October 2025
