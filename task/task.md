# Backend Engineer Case Study

## Introduction

We want to understand how you approach solving problems. Most importantly we want to understand how you design, implement and test your solutions.

Please spend a maximum of **8 hours** on this exercise. If you do not have time to implement a complete solution, please provide a ReadMe file with notes for discussion that outline what your approach would be.

At the review you will take us through your implementation - explaining your data model, your architecture and design decisions, and your testing approach. Please be prepared to share your screen and demonstrate your code and any working parts of your solution.

## Task: Extend our medical questionnaire

One of the challenges customers face when purchasing products from Manual is that they are not sure which product is the most suitable for their condition.

To address this, we want to extend the functionality of our medical history questionnaire to also recommend appropriate products to the customer based on their answers.

The flow will be that the customer completes a questionnaire on the website and then they will be shown a list of products that has been specifically personalized for them. They can then choose from that list which product they want to order.

## Requirements

You are tasked with architecting the backend-side of this functionality for the **Erectile Dysfunction (ED)** category. The category currently contains the following products:

* Sildenafil 50mg
* Sildenafil 100mg
* Tadalafil 10mg
* Tadalafil 20mg

The questionnaire and related logic/restrictions question are provided in this spreadsheet.

While we use PHP on the backend at Manual for the moment, the task can also be implemented in **Python, TypeScript/JS, Go or Java** - whatever option you feel most proficient with.

## Deliverables

You are asked to provide the following:

1. An API that returns the questionnaire, which includes all the questions and answers (plus any conditional restrictions for when questions should appear). Frontend engineers will use this API to render the complete questionnaire flow to the customer.

2. An API that accepts the questionnaire answers and returns an array of the recommended products that the customer can purchase.

Please assume that the product info is stored elsewhere, and for the purposes of this assignment you can use a simple identifier (e.g. `sildenafil_50`, `tadalafil_10`, etc).

## Future Considerations

In the future we would expect to be able to manage this questionnaire from an admin system which you should bear in mind, but this is not a requirement for this case study.
