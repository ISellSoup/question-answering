const treeUpdateEvent = new Event("application:treeUpdate");
let bodyAllowList = [
    "ContentReference",
    "Group",
    "Folder",
    "QuestionAsnwersPair"
]

class ApplicationObject extends EventTarget {
    constructor() {
        this.temp = {} // Values inside temp are not saved
        this.editor = {} // Editor metadata
    }
}

class Collection extends ApplicationObject {
    constructor(contents = []) {
        super()
        this.contents = contents;
        this.displayName = "";

        this.className = "Collection";
    }
}

class SubCollection extends Collection {
    constructor(contents = []) {
        super(contents);
        this.temp.parent = null;

        this.className = "SubCollection";
    }
}

class WordBankEntry extends ApplicationObject {
    constructor(value = "") {
        super()
        this.value = value;
        this.temp.parent = null;
        this.enabled = true;

        this.className = "WordBankEntry";
    }
    convertToWordBank() {
        window.dispatchEvent(treeUpdateEvent);
        return new WordBank([this]); // Make sure to let the user name the wordbank immediately after conversion
    }
}

class WordBank extends SubCollection {
    constructor(contents = []) {
        super(contents);
        this.enabled = true;

        this.className = "WordBank";
    }
}

class QuestionAsnwersPair extends ApplicationObject {
    constructor(question = "", answers = []) {
        super()
        this.question = question;
        // Can be a string or a WordBank
        this.answers = answers;
        this.temp.parent = null;
        this.enabled = true;

        this.className = "QuestionAsnwerPair";
    }
}

// Groups of other Groups or objects, used for batch enable/disable
class Group extends SubCollection {
    constructor(contents = []) {
        super(contents);
        this.enabled = true;

        this.className = "Group";
    }
    convertToFolder() {
        const folder = new Folder(this.contents);
        folder.displayName = this.displayName;

        window.dispatchEvent(treeUpdateEvent);
        return folder;
    }
}

// Folders do not have an enabled property. Passes parent's enabled/disabled.
class Folder extends SubCollection {
    constructor(contents = []) {
        super(contents);
        
        this.className = "Folder";
    }
    convertToGroup() {
        const group = new Group(this.contents);
        group.displayName = this.displayName;

        window.dispatchEvent(treeUpdateEvent);
        return group;
    }
}

class ContentReference extends ApplicationObject {
    constructor() {
        super()
        this.path = []; //An array of indexes pointing to the target
        this.temp.target = null; 
        this.temp.parent = null;
        this.enabled = true;

        this.className = "QuestionAsnwerPair";
    }
}

class Set extends Collection {
    constructor() {
        super([]);
        this.description = "";

        this.body = [];

        this.className = "Set";
    }
}