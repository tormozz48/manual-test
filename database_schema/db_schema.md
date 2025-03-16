# Database Schema for Medical Questionnaire System

This document describes the database schema for the medical questionnaire system based on the actual migrations in the codebase.

## Core Tables

### Product Category (`product_category`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **id** | INTEGER | Primary Key, Auto-increment | Unique identifier |
| code | VARCHAR | Unique | Category code |
| name | VARCHAR | | Category name |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP | Last update timestamp |

### Product Family (`product_family`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **id** | INTEGER | Primary Key, Auto-increment | Unique identifier |
| code | VARCHAR | Unique | Family code |
| name | VARCHAR | | Family name |
| categoryId | INTEGER | Foreign Key → product_category.id | Reference to parent category |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP | Last update timestamp |

### Products (`product`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **id** | INTEGER | Primary Key, Auto-increment | Unique identifier |
| name | VARCHAR | | Product name |
| doze | INTEGER | Default: 0 | Dosage amount |
| unit | VARCHAR | | Dosage unit (e.g., "mg") |
| categoryId | INTEGER | Foreign Key → product_category.id | Reference to product category |
| familyId | INTEGER | Foreign Key → product_family.id | Reference to product family |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP | Last update timestamp |

## Questionnaire Tables

### Quizzes (`quiz`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **id** | INTEGER | Primary Key, Auto-increment | Unique identifier |
| name | VARCHAR | | Quiz name |
| categoryId | INTEGER | Foreign Key → product_category.id | Reference to associated product category |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP | Last update timestamp |

### Questions (`question`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **id** | INTEGER | Primary Key, Auto-increment | Unique identifier |
| code | VARCHAR | | Question code/identifier |
| name | VARCHAR | | Question text |
| quizId | INTEGER | Foreign Key → quiz.id | Reference to parent quiz |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP | Last update timestamp |

### Answers (`answer`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **id** | INTEGER | Primary Key, Auto-increment | Unique identifier |
| name | VARCHAR | | Answer text |
| questionId | INTEGER | Foreign Key → question.id | Reference to parent question |
| nextQuestionId | INTEGER | Foreign Key → question.id, Nullable | Reference to next question (for branching logic) |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP | Last update timestamp |

## Recommendation Tables

### Answer Receipts (`answer_receipt`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **id** | INTEGER | Primary Key, Auto-increment | Unique identifier |
| excludeAll | BOOLEAN | Default: false | Flag to exclude all products |
| answerId | INTEGER | Foreign Key → answer.id, Unique | Reference to associated answer |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP | Last update timestamp |

### Answer Receipt Products (`answer_receipt_products`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **answerReceiptId** | INTEGER | Primary Key, Foreign Key → answer_receipt.id | Reference to answer receipt |
| **productId** | INTEGER | Primary Key, Foreign Key → product.id | Reference to recommended product |

### Answer Receipt Product Families (`answer_receipt_product_families`)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| **answerReceiptId** | INTEGER | Primary Key, Foreign Key → answer_receipt.id | Reference to answer receipt |
| **productFamilyId** | INTEGER | Primary Key, Foreign Key → product_family.id | Reference to excluded product family |

## Entity Relationships

1. **Product Category**
   - Has many Product Families
   - Has many Products
   - Has many Quizzes

2. **Product Family**
   - Belongs to a Product Category
   - Has many Products

3. **Product**
   - Belongs to a Product Category
   - Belongs to a Product Family

4. **Quiz**
   - Belongs to a Product Category
   - Has many Questions

5. **Question**
   - Belongs to a Quiz
   - Has many Answers
   - Can be the next question for many Answers (branching)

6. **Answer**
   - Belongs to a Question
   - Can lead to another Question (branching)
   - Can have one Answer Receipt

7. **Answer Receipt**
   - Belongs to an Answer
   - Can recommend many Products (many-to-many)
   - Can exclude many Product Families (many-to-many)

## Notes

This schema follows TypeORM conventions with:
- camelCase property names in entities
- Foreign key relationships with cascade delete options
- Timestamps for creation and updates
- Junction tables for many-to-many relationships
