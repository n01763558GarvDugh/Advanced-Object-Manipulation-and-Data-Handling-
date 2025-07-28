// JavaScript Object Manipulation Lab
// Advanced ES6+ Features: Destructuring, Spread Operator, and Object Methods

// Helper function to display output both in console and on page
function displayOutput(title, content) {
    console.log(`\n=== ${title} ===`);
    console.log(content);
    
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <div class="log-header">=== ${title} ===</div>
            <div class="log-content">${typeof content === 'object' ? JSON.stringify(content, null, 2) : content}</div>
        `;
        outputDiv.appendChild(entry);
    }
}

// Helper function to display section headers
function displaySection(sectionName) {
    console.log(`\n\n🔸 ${sectionName} 🔸`);
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        const section = document.createElement('div');
        section.className = 'log-entry';
        section.innerHTML = `<div class="log-header">🔸 ${sectionName} 🔸</div>`;
        outputDiv.appendChild(section);
    }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    displaySection('PART 1: Understanding and Creating Objects');
    
    // Part 1: Create a student object
    const student = {
        name: "Alice Johnson",
        age: 21,
        enrolled: true,
        courses: ["JavaScript", "Python", "Data Structures", "Web Development"],
        
        // Method to display basic student information
        displayInfo() {
            return `Student: ${this.name}, Age: ${this.age}, Enrolled: ${this.enrolled ? 'Yes' : 'No'}`;
        }
    };
    
    // Display name and age properties
    displayOutput('Student Name', student.name);
    displayOutput('Student Age', student.age);
    
    // Call and display the method result
    displayOutput('Student Info Method Result', student.displayInfo());
    
    // =====================================================
    
    displaySection('PART 2: Working with JSON');
    
    // Part 2: JSON conversion
    // Convert student object to JSON string
    const studentJSON = JSON.stringify(student);
    displayOutput('Student Object as JSON String', studentJSON);
    
    // Convert JSON string back to JavaScript object
    const studentFromJSON = JSON.parse(studentJSON);
    displayOutput('Object Converted Back from JSON', studentFromJSON);
    
    // Compare original and converted object
    displayOutput('Comparison - Original vs Converted', {
        'Original object has displayInfo method': typeof student.displayInfo === 'function',
        'Converted object has displayInfo method': typeof studentFromJSON.displayInfo === 'function',
        'Note': 'Methods are lost during JSON conversion!'
    });
    
    // =====================================================
    
    displaySection('PART 3: Using Destructuring Assignment');
    
    // Part 3: Destructuring
    // Destructure name and courses from student object
    const { name, courses } = student;
    displayOutput('Destructured Name', name);
    displayOutput('Destructured Courses', courses);
    
    // Create array of scores and destructure first two
    const scores = [85, 92, 78, 90, 88, 95];
    const [firstScore, secondScore] = scores;
    displayOutput('Array of Scores', scores);
    displayOutput('First Two Scores (Destructured)', { firstScore, secondScore });
    
    // Advanced destructuring examples
    const { age: studentAge, enrolled: isEnrolled } = student;
    displayOutput('Destructuring with Renaming', { studentAge, isEnrolled });
    
    // Destructuring with default values
    const { graduationYear = 2025, gpa = 3.5 } = student;
    displayOutput('Destructuring with Default Values', { graduationYear, gpa });
    
    // =====================================================
    
    displaySection('PART 4: The Spread Operator');
    
    // Part 4: Spread operator
    // Clone the student object using spread operator
    const clonedStudent = { ...student };
    
    // Add new property to cloned object
    clonedStudent.graduationYear = 2025;
    clonedStudent.gpa = 3.8;
    
    displayOutput('Original Student Object', student);
    displayOutput('Cloned Student with New Properties', clonedStudent);
    
    // Merge arrays using spread operator
    const newCourses = ["Machine Learning", "Cloud Computing", "Mobile Development"];
    const allCourses = [...student.courses, ...newCourses];
    displayOutput('Original Courses', student.courses);
    displayOutput('New Courses', newCourses);
    displayOutput('All Courses Combined', allCourses);
    
    // More spread operator examples
    const additionalInfo = { major: "Computer Science", semester: 6 };
    const completeStudent = { ...student, ...additionalInfo };
    displayOutput('Student with Additional Info', completeStudent);
    
    // =====================================================
    
    displaySection('PART 5: Object Methods');
    
    // Part 5: Adding dynamic methods to the student object
    // Method to add a new course
    student.addCourse = function(courseName) {
        if (!this.courses.includes(courseName)) {
            this.courses.push(courseName);
            return `Course "${courseName}" added successfully!`;
        } else {
            return `Course "${courseName}" already exists!`;
        }
    };
    
    // Method to calculate total number of courses
    student.getTotalCourses = function() {
        return this.courses.length;
    };
    
    // Method to remove a course
    student.removeCourse = function(courseName) {
        const index = this.courses.indexOf(courseName);
        if (index > -1) {
            this.courses.splice(index, 1);
            return `Course "${courseName}" removed successfully!`;
        } else {
            return `Course "${courseName}" not found!`;
        }
    };
    
    // Method to get courses by category (assuming courses have prefixes)
    student.getCoursesByType = function(type) {
        return this.courses.filter(course => 
            course.toLowerCase().includes(type.toLowerCase())
        );
    };
    
    // Test the new methods
    displayOutput('Total Courses Before Adding', student.getTotalCourses());
    displayOutput('Adding New Course', student.addCourse("Artificial Intelligence"));
    displayOutput('Total Courses After Adding', student.getTotalCourses());
    displayOutput('Updated Courses List', student.courses);
    
    // Try adding duplicate course
    displayOutput('Adding Duplicate Course', student.addCourse("JavaScript"));
    
    // Test course filtering
    displayOutput('Courses with "Data"', student.getCoursesByType("Data"));
    
    // =====================================================
    
    displaySection('BONUS TASK: Calculate Average Score');
    
    // Bonus: Calculate average score using reduce
    const averageScore = scores.reduce((sum, score, index, array) => {
        sum += score;
        // Return average on last iteration
        return index === array.length - 1 ? sum / array.length : sum;
    });
    
    // Alternative cleaner approach
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScoreClean = totalScore / scores.length;
    
    displayOutput('All Scores', scores);
    displayOutput('Total Score', totalScore);
    displayOutput('Average Score', averageScoreClean.toFixed(2));
    
    // More advanced array operations
    const highScores = scores.filter(score => score >= 90);
    const lowScores = scores.filter(score => score < 80);
    const passedAll = scores.every(score => score >= 70);
    const hasExceptionalScore = scores.some(score => score >= 95);
    
    displayOutput('Advanced Array Analysis', {
        'High Scores (>=90)': highScores,
        'Low Scores (<80)': lowScores,
        'Passed All (>=70)': passedAll,
        'Has Exceptional Score (>=95)': hasExceptionalScore
    });
    
    // =====================================================
    
    displaySection('ADDITIONAL ADVANCED FEATURES');
    
    // Advanced object manipulation examples
    
    // Object.keys, Object.values, Object.entries
    displayOutput('Object Keys', Object.keys(student));
    displayOutput('Object Values (excluding methods)', Object.values(student).filter(value => typeof value !== 'function'));
    displayOutput('Object Entries (first 3)', Object.entries(student).slice(0, 3));
    
    // Object composition and method chaining
    const GradeBook = {
        grades: {},
        
        addGrade(course, grade) {
            this.grades[course] = grade;
            return this; // Enable method chaining
        },
        
        getGrade(course) {
            return this.grades[course] || 'No grade recorded';
        },
        
        getAverage() {
            const grades = Object.values(this.grades);
            return grades.length ? 
                (grades.reduce((sum, grade) => sum + grade, 0) / grades.length).toFixed(2) : 
                0;
        },
        
        getAllGrades() {
            return { ...this.grades };
        }
    };
    
    // Demonstrate method chaining
    GradeBook
        .addGrade('JavaScript', 92)
        .addGrade('Python', 88)
        .addGrade('Data Structures', 95)
        .addGrade('Web Development', 90);
    
    displayOutput('Method Chaining Result - All Grades', GradeBook.getAllGrades());
    displayOutput('Grade Average', GradeBook.getAverage());
    
    // =====================================================
    
    displaySection('LAB COMPLETION SUMMARY');
    
    const completionSummary = {
        'Part 1 - Object Creation': '✅ Created student object with properties and methods',
        'Part 2 - JSON Operations': '✅ Converted to/from JSON and compared objects',
        'Part 3 - Destructuring': '✅ Destructured object properties and array elements',
        'Part 4 - Spread Operator': '✅ Cloned objects and merged arrays',
        'Part 5 - Object Methods': '✅ Added dynamic methods for course management',
        'Bonus Task': '✅ Calculated average using reduce method',
        'Advanced Features': '✅ Demonstrated additional ES6+ concepts',
        'Total Concepts Covered': '15+ JavaScript ES6+ features and techniques'
    };
    
    displayOutput('Lab Completion Status', completionSummary);
    
    // Final message
    console.log('\n🎉 JavaScript Object Manipulation Lab Completed Successfully! 🎉');
    console.log('📝 Check both console output and the webpage for results');
    console.log('🚀 Ready for GitHub Pages deployment!');
    
});

// Additional utility functions for extended learning

// Function to demonstrate object inheritance with prototypes
function createAdvancedStudent(name, age) {
    const student = Object.create({
        // Prototype methods
        study(hours) {
            return `${this.name} studied for ${hours} hours`;
        },
        
        graduate() {
            this.enrolled = false;
            this.graduationDate = new Date().toISOString().split('T')[0];
            return `${this.name} graduated on ${this.graduationDate}`;
        }
    });
    
    // Set properties
    student.name = name;
    student.age = age;
    student.enrolled = true;
    student.courses = [];
    
    return student;
}

// Function to demonstrate advanced destructuring patterns
function demonstrateAdvancedDestructuring() {
    const complexObject = {
        user: {
            id: 1,
            profile: {
                name: "John Doe",
                settings: {
                    theme: "dark",
                    notifications: true
                }
            }
        },
        courses: ["JS", "React", "Node"],
        metadata: {
            created: "2024",
            updated: "2025"
        }
    };
    
    // Nested destructuring
    const {
        user: {
            profile: {
                name: userName,
                settings: { theme, notifications }
            }
        },
        courses: [firstCourse, ...otherCourses]
    } = complexObject;
    
    return { userName, theme, notifications, firstCourse, otherCourses };
}