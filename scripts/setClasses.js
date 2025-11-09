class AnswerBank {
    constructor(answers = []) {
        this.answers = answers;
    }
}

class QuestionAsnwerPair {
    constructor(question = "", answer = "") {
        this.question = question;
        this.answer = answer;
    }
}

class Group {
    constructor(contents = []) {
        this.contents = contents;
    }
}

class Set {
    constructor() {
        this.displayName = "";
        this.description = "";
        this.data = [];
    }
}