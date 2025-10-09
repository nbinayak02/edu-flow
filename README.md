# EduFlow
## 1. Overview

### 1.1 Purpose
EduFlow is a web-based marks and student management system designed to simplify academic record handling for educational institutions. The system enables administrators to manage student data, record marks, compute Grade Point Average (GPA), and generate academic certificates such as marksheets and transcripts. The goal is to minimize manual errors, automate repetitive academic processes, and integrate artificial intelligence to provide data-driven insights.

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

## 3. Functional Requirements

### 3.1 Core Features

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

### 3.2 AI-Integrated Features

1. **Performance Insights (Gemini API)**  
   After marks entry, the system can analyze performance trends and generate feedback for each student using the Gemini AI API.  
   Example:  
   *“The student has shown consistent improvement in Mathematics but needs to focus more on Science.”*

2. **Report Summarization**  
   AI summarizes class-wide reports or GPA distributions into human-readable text for admin review.

3. **Natural Language Query (Optional Experimental Feature)**  
   Admin can ask questions like:  
   *“Show top three students in Class 11 this year.”*  
   Gemini processes the query and suggests corresponding database actions.

---

## 4. Non-Functional Requirements

| Attribute | Description |
|------------|-------------|
| **Reliability** | GPA logic follows NEB standards. AI features are optional and fallback-safe. |
| **Usability** | UI should be intuitive and responsive. |
| **Scalability** | Support multiple classes, and exams per admin. |
| **Performance** | Core operations complete within 2 seconds; AI calls handled asynchronously. |
| **Security** | Passwords hashed; API keys stored securely via environment variables. |
| **Maintainability** | Modular code with separate AI integration layer (`/lib/ai`). |
| **Availability** | Deployed on Vercel with managed PostgreSQL database. |
| **Ethical Use of AI** | AI-generated content reviewed by admin before finalization. No student data shared beyond intended use. |

---

## 5. System Design

### 5.1 Architecture

EduFlow follows a client–server model built using **Next.js 15 (App Router)**, **TypeScript**, and **Prisma ORM** with **PostgreSQL**.  
AI integration is modular through a Gemini API client.


---

### 5.2 Database Schema

| Table | Fields | Description |
|--------|---------|-------------|
| **Users** | id, name, role, email, password | Authentication and role management |
| **Schools** | id, name, address, contact, user_id | Represents institutions managed by admins |
| **Classes** | id, name, school_id | Academic classes |
| **Subjects** | id, name, class_id, school_id, credit_hour | Subjects taught in a class |
| **Students** | id, name, address, contact, school_id, class_id, year | Student details |
| **Exams** | id, name, year, class_id | Exam metadata |
| **ExamInfo** | id, exam_id, subject_id, full_marks, pass_marks | Subject-level exam setup |
| **Marksheet** | id, stu_id, class_id, year, exam_id, total, gpa | Aggregated results |
| **Marks** | id, marksheet_id, subject_id, obtained_marks | Individual subject marks |

---

### 5.3 AI Integration Layer

| Component | Function |
|------------|-----------|
| **geminiClient.ts** | Handles API communication with Gemini (fetch, prompt, response). |
| **prompts/** | Stores pre-defined prompt templates for performance analysis, certificate generation, and report summaries. |
| **cache/** | Optional caching of AI responses for performance. |
| **safetyChecks.ts** | Sanitizes input/output to prevent prompt injection and ensure clean responses. |

---

### 5.4. Technology Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui |
| **Backend** | Prisma ORM, Server Actions |
| **Database** | PostgreSQL |
| **AI Integration** | Gemini API |
| **Authentication** | NextAuth.js |
| **Deployment** | Vercel + Neon Database |

---

### 6. Development Roadmap

| Phase | Description |
|--------|-------------|
| **Phase 1** | Core CRUD: Students, Exams, Marks |
| **Phase 2** | GPA and Marksheet Generation |
| **Phase 3** | Certificate Module |
| **Phase 4** | Gemini AI Integration |
| **Phase 5** | UI Enhancements, Optimization, Deployment |

---

## 7. Future Enhancements

- Multi-role system (Teacher, Student, Parent)
- Advanced analytics (GPA distribution graphs)
- Chat-based data querying

---

## 8. References

- **NEB GPA Calculation Standards (Nepal)**  
- **Gemini API Documentation**  
- **Next.js 15 & Prisma Documentation**

---

## 9. Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

*Version:* `v0.1.0`  
*Author:* Binayak Niraula  
*Date:* October 2025
