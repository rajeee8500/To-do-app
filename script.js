document.addEventListener('DOMContentLoaded', function() {
    const questionsContainer = document.querySelector('.questions-container');
    const addQuestionButton = document.getElementById('addQuestionButton');
    const newQuestionInput = document.getElementById('newQuestionInput');

    let questionsData = [
                { id: 1, question: "Can you tell us a little about yourself?", rank: 1 },
                { id: 2, question: "How did you hear about this position?", rank: 2 },
                { id: 3, question: "What do you know about our company, and why do you want to work here?", rank: 3 },
                { id: 4, question: "What are your greatest professional strengths?", rank: 4 },
                { id: 5, question: "Can you describe a challenge you've faced at work?", rank: 5 },
                { id: 6, question: "Where do you see yourself in five years?", rank: 6 },
                { id: 7, question: "Why are you leaving your current job?", rank: 7 },
                { id: 8, question: "What's your approach to working under pressure?", rank: 8 },
                { id: 9, question: "Can you give an example of how you've worked on a team?", rank: 9 },
                { id: 10, question: " Do you have any questions for us about the company or the role?", rank: 10 },   
    ];

    function renderQuestions() {
        questionsContainer.innerHTML = "";
        questionsData.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-item');
            questionDiv.innerHTML = `
                <div class="question-text">${question.question}</div>
                <div class="question-controls">
                    <button class="edit-button" onclick="editQuestion(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteQuestion(${index})">Delete</button>
                    <input type="number" class="rank-input" value="${question.rank}" min="1" max="${questionsData.length}" onchange="changeRank(${index}, this.value)">
                </div>
            `;
            questionsContainer.appendChild(questionDiv);
        });
    }

    function addQuestion() {
        const questionText = newQuestionInput.value.trim();
        if (questionText) {
            const newQuestion = {
                id: questionsData.length + 1,
                question: questionText,
                rank: questionsData.length + 1
            };
            questionsData.push(newQuestion);
            newQuestionInput.value = '';
            renderQuestions();
        } else {
            alert("Please enter a question.");
        }
    }

    function editQuestion(index) {
        const newQuestionText = prompt("Edit the question:", questionsData[index].question);
        if (newQuestionText) {
            questionsData[index].question = newQuestionText;
            renderQuestions();
        }
    }

    function deleteQuestion(index) {
        if (confirm("Are you sure you want to delete this question?")) {
            questionsData.splice(index, 1);
            renderQuestions();
        }
    }

    function changeRank(index, newRank) {
        const rank = parseInt(newRank);
        if (rank && rank !== questionsData[index].rank) {
            questionsData[index].rank = rank;
            questionsData.sort((a, b) => a.rank - b.rank); 
            renderQuestions();
        }
    }

   
    addQuestionButton.addEventListener('click', addQuestion);


    window.editQuestion = editQuestion;
    window.deleteQuestion = deleteQuestion;
    window.changeRank = changeRank;

    renderQuestions();
});
