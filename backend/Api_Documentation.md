# ATLAS (Advanced Teaching and Learning Management System) - Database Schema and API Routes

## Database Schema

# you don't need to take care of the date fields in the frontend.

### User Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`username`**

  - **Type:** `String`
  - **Attributes:** `@unique`
  - **Description:** Unique username for the user.

- **`firstname`**

  - **Type:** `String?`
  - **Description:** First name of the user (optional).

- **`secondname`**

  - **Type:** `String?`
  - **Description:** Second name of the user (optional).

- **`classroomId`**

  - **Type:** `String[]`
  - **Attributes:** `@db.ObjectId`
  - **Description:** References to the classrooms the user is in.

- **`age`**

  - **Type:** `Int?`
  - **Description:** Age of the user (optional).

- **`email`**

  - **Type:** `String`
  - **Attributes:** `@unique`
  - **Description:** Unique email of the user.

- **`attempt`**

  - **Type:** `Attempt[]`
  - **Description:** Attempts made by the user on quizzes.

- **`usertype`**

  - **Type:** `UserType`
  - **Attributes:** `@default(STUDENT)`
  - **Description:** Type of user (ADMIN or STUDENT).

- **`clerkId`**

  - **Type:** `String`
  - **Attributes:** `@unique`
  - **Description:** Unique identifier for authentication.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the user was created.

- **`updatedAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the user was last updated.

- **`StudentInClass`**
  - **Type:** `StudentsInClass?`
  - **Description:** Relationship with StudentsInClass model.

---

### Teacher Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`email`**

  - **Type:** `String`
  - **Attributes:** `@unique`
  - **Description:** Unique email of the teacher.

- **`username`**

  - **Type:** `String`
  - **Attributes:** `@unique`
  - **Description:** Unique username for the teacher.

- **`firstname`**

  - **Type:** `String?`
  - **Description:** First name of the teacher (optional).

- **`secondname`**

  - **Type:** `String?`
  - **Description:** Second name of the teacher (optional).

- **`clerkId`**

  - **Type:** `String`
  - **Attributes:** `@unique`
  - **Description:** Unique identifier for authentication.

- **`teachingsubject`**

  - **Type:** `String`
  - **Description:** Subject the teacher teaches.

- **`classroomId`**

  - **Type:** `String[]`
  - **Attributes:** `@db.ObjectId`
  - **Description:** References to the classrooms the teacher manages.

- **`classrooms`**

  - **Type:** `ClassRoom[]`
  - **Attributes:** `@relation(fields: [classroomId], references: [id])`
  - **Description:** Classrooms associated with the teacher.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the teacher was created.

- **`updatedAt`**
  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the teacher was last updated.

---

### StudentsInClass Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`studentId`**

  - **Type:** `String`
  - **Attributes:** `@db.ObjectId @unique`
  - **Description:** Reference to the student's ID.

- **`student`**

  - **Type:** `User`
  - **Attributes:** `@relation(fields: [studentId], references: [id])`
  - **Description:** Relationship with the User model.

- **`classRoomId`**

  - **Type:** `String`
  - **Attributes:** `@db.ObjectId`
  - **Description:** Reference to the classroom's ID.

- **`classRoom`**

  - **Type:** `ClassRoom`
  - **Attributes:** `@relation(fields: [classRoomId], references: [id])`
  - **Description:** Relationship with the ClassRoom model.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the record was created.

- **`updatedAt`**
  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the record was last updated.

---

### ClassRoom Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`name`**

  - **Type:** `String`
  - **Description:** Name of the classroom.

- **`teacherId`**

  - **Type:** `String[]`
  - **Attributes:** `@db.ObjectId`
  - **Description:** References to the teachers managing the classroom.

- **`teachers`**

  - **Type:** `Teacher[]`
  - **Attributes:** `@relation(fields: [teacherId], references: [id])`
  - **Description:** Teachers managing the classroom.

- **`students`**

  - **Type:** `StudentsInClass[]`
  - **Description:** Students in the classroom.

- **`topics`**

  - **Type:** `Topic[]`
  - **Description:** Topics taught in the classroom.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the classroom was created.

- **`updatedAt`**
  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the classroom was last updated.

---

### TopicContent Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`topicId`**

  - **Type:** `String`
  - **Attributes:** `@db.ObjectId`
  - **Description:** Reference to the topic's ID.

- **`contenttype`**

  - **Type:** `TopicContentType`
  - **Attributes:** `@default(PDF)`
  - **Description:** Type of content (PDF, WORD, VIDEO, AUDIO).

- **`content`**

  - **Type:** `String`
  - **Description:** Content of the topic (e.g., file path).

- **`topic`**

  - **Type:** `Topic`
  - **Attributes:** `@relation(fields: [topicId], references: [id], onDelete: Cascade)`
  - **Description:** Relationship with the Topic model.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the content was created.

- **`updatedAt`**
  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the content was last updated.

---

### Topic Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`name`**

  - **Type:** `String`
  - **Description:** Name of the topic.

- **`classRoomId`**

- **Type:** `String`
- **Attributes:** `@db.ObjectId`
- **Description:** Reference to the classroom's ID.

- **`classRoom`**

  - **Type:** `ClassRoom`
  - **Attributes:** `@relation(fields: [classRoomId], references: [id], onDelete: Cascade)`
  - **Description:** Relationship with the ClassRoom model.

- **`topicContent`**

  - **Type:** `TopicContent[]`
  - **Description:** Content related to the topic.

- **`quizzes`**

  - **Type:** `Quiz[]`
  - **Description:** Quizzes associated with the topic.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the topic was created.

- **`updatedAt`**
  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the topic was last updated.

---

### Quiz Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`name`**

  - **Type:** `String`
  - **Description:** Name of the quiz.

- **`topicId`**

  - **Type:** `String`
  - **Attributes:** `@db.ObjectId`
  - **Description:** Reference to the topic's ID.

- **`topic`**

  - **Type:** `Topic`
  - **Attributes:** `@relation(fields: [topicId], references: [id], onDelete: Cascade)`
  - **Description:** Relationship with the Topic model.

- **`questions`**

  - **Type:** `Question[]`
  - **Description:** Questions in the quiz.

- **`attempts`**

  - **Type:** `Attempt[]`
  - **Description:** Attempts made by students on the quiz.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the quiz was created.

- **`updatedAt`**
  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the quiz was last updated.

---

### Question Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`question`**

  - **Type:** `String`
  - **Description:** Text of the question.

- **`options`**

  - **Type:** `String[]`
  - **Description:** List of answer options.

- **`answer`**

  - **Type:** `String`
  - **Description:** Correct answer to the question.

- **`quizId`**

  - **Type:** `String`
  - **Attributes:** `@db.ObjectId`
  - **Description:** Reference to the quiz's ID.

- **`quiz`**

  - **Type:** `Quiz`
  - **Attributes:** `@relation(fields: [quizId], references: [id], onDelete: Cascade)`
  - **Description:** Relationship with the Quiz model.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the question was created.

- **`updatedAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the question was last updated.

- **`attemptId`**

  - **Type:** `String?`
  - **Attributes:** `@db.ObjectId`
  - **Description:** Reference to the attempt's ID (if any).

- **`Attempt`**
  - **Type:** `Attempt?`
  - **Attributes:** `@relation(fields: [attemptId], references: [id])`
  - **Description:** Relationship with the Attempt model.

---

### Attempt Model

#### Fields:

- **`id`**

  - **Type:** `String`
  - **Attributes:** `@id @default(auto()) @map("_id") @db.ObjectId`
  - **Description:** Primary key, auto-generated.

- **`score`**

  - **Type:** `Int`
  - **Description:** Score obtained by the student.

- **`quizId`**

  - **Type:** `String`
  - **Attributes:** `@db.ObjectId`
  - **Description:** Reference to the quiz's ID.

- **`quiz`**

  - **Type:** `Quiz`
  - **Attributes:** `@relation(fields: [quizId], references: [id], onDelete: Cascade)`
  - **Description:** Relationship with the Quiz model.

- **`question`**

  - **Type:** `Question[]`
  - **Description:** Questions answered in the attempt.

- **`answers`**

  - **Type:** `String[]`
  - **Description:** Answers given by the student.

- **`studentId`**

  - **Type:** `String`
  - **Attributes:** `@db.ObjectId`
  - **Description:** Reference to the student's ID.

- **`student`**

  - **Type:** `User`
  - **Attributes:** `@relation(fields: [studentId], references: [id], onDelete: Cascade)`
  - **Description:** Relationship with the User model.

- **`createdAt`**

  - **Type:** `DateTime`
  - **Attributes:** `@default(now())`
  - **Description:** Timestamp for when the attempt was created.

- **`updatedAt`**
  - **Type:** `DateTime`
  - **Attributes:** `@updatedAt`
  - **Description:** Timestamp for when the attempt was last updated.

---

## API Routes

Below are the routes to interact with the database models:

**Note:** The local testing base URL is `http://localhost:5000`.

### 1. User Routes

- **GET** `/api/users`: Get all users.
- **GET** `/api/users/:id`: Get a user by ID.
- **POST** `/api/users`: Create a new user.
- **PUT** `/api/users/:id`: Update a user by ID.
- **DELETE** `/api/users/:id`: Delete a user by ID.

### 2. Teacher Routes

- **GET** `/api/teachers`: Get all teachers.
- **GET** `/api/teachers/:id`: Get a teacher by ID.
- **POST** `/api/teachers`: Create a new teacher.
- **PUT** `/api/teachers/:id`: Update a teacher by ID.
- **DELETE** `/api/teachers/:id`: Delete a teacher by ID.

### 3. Admin Routes

- **GET** `/api/admin`: Get all teachers.
- **GET** `/api/admin/:id`: Get a teacher by ID.
- **POST** `/api/admin`: Create a new teacher.
- **PUT** `/api/admin/:id`: Update a teacher by ID.
- **DELETE** `/api/admin/:id`: Delete a teacher by ID.

### 4. ClassRoom Routes

- **GET** `/api/classrooms`: Get all classrooms.
- **GET** `/api/classrooms/:id`: Get a classroom by ID.
- **POST** `/api/classrooms`: Create a new classroom.
- **PUT** `/api/classrooms/:id`: Update a classroom by ID.
- **DELETE** `/api/classrooms/:id`: Delete a classroom by ID.

### 5. Topic Routes

- **GET** `/api/topics`: Get all topics.
- **GET** `/api/topics/:id`: Get a topic by ID.
- **POST** `/api/topics`: Create a new topic.
- **PUT** `/api/topics/:id`: Update a topic by ID.
- **DELETE** `/api/topics/:id`: Delete a topic by ID.

### 6. TopicContent Routes

- **GET** `/api/topicContents`: Get all topic contents.
- **GET** `/api/topicContents/:id`: Get a topic content by ID.
- **POST** `/api/topicContents`: Create new topic content.
- **PUT** `/api/topicContents/:id`: Update a topic content by ID.
- **DELETE** `/api/topicContents/:id`: Delete a topic content by ID.

### 7. Quiz Routes

- **GET** `/api/quizzes`: Get all quizzes.
- **GET** `/api/quizzes/:id`: Get a quiz by ID.
- **POST** `/api/quizzes`: Create a new quiz.
- **PUT** `/api/quizzes/:id`: Update a quiz by ID.
- **DELETE** `/api/quizzes/:id`: Delete a quiz by ID.

### 8. Question Routes

- **GET** `/api/questions`: Get all questions.
- **GET** `/api/questions/:id`: Get a question by ID.
- **POST** `/api/questions`: Create a new question.
- \*\*PUT

\*\* `/api/questions/:id`: Update a question by ID.

- **DELETE** `/api/questions/:id`: Delete a question by ID.

### 9. Attempt Routes

- **GET** `/api/attempts`: Get all attempts.
- **GET** `/api/attempts/:id`: Get an attempt by ID.
- **POST** `/api/attempts`: Create a new attempt.
- **PUT** `/api/attempts/:id`: Update an attempt by ID.
- **DELETE** `/api/attempts/:id`: Delete an attempt by ID.
