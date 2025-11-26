console.log("Loaded class definitions");

const treeUpdateEvent = new Event("application:treeUpdate");
let bodyAllowList = [ // Only these classes can be added to the set's body
    "ContentReference",
    "Group",
    "Folder",
    "QuestionAsnwersPair"
]
let contentsDenyList = [ // These classes cannot be added to the set's contents
    "ContentReference"
]

class ApplicationObject extends EventTarget {
    constructor() {
        super()
        this.temp = {
            parent:null
        } // Values inside temp are not saved
        this.meta = {} // Saved but not used by the application. Intended for extensions.

        this.className = "ApplicationObject";
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

class ApplicationSet extends Collection {
    constructor() {
        super([new Folder(), new Folder()]); // First folder is content, second is body
        this.description = "";

        this.body = [];

        this.className = "Set";
    }
}

class ContentReference extends ApplicationObject {
    constructor() {
        super()
        this.path = [];
        this.temp.target = null; 
        this.enabled = true;

        this.className = "QuestionAsnwerPair";
    }
}

class WordBank extends Collection {
    constructor(contents = []) {
        super(contents);
        this.enabled = true;

        this.className = "WordBank";
    }
}

class WordBankEntry extends ApplicationObject {
    constructor(value = "") {
        super()
        this.value = value;
        this.enabled = true;

        this.className = "WordBankEntry";
    }
    convertToWordBank() {
        window.dispatchEvent(treeUpdateEvent);
        return new WordBank([this]); // Make sure to let the user name the wordbank immediately after conversion
    }
}

class QuestionAnswersPair extends ApplicationObject {
    constructor(question = "", answers = []) {
        super()
        this.question = question;
        // Can be a string or a WordBank
        this.answers = answers;
        this.enabled = true;

        this.className = "QuestionAsnwerPair";
    }
}

// Groups of other Groups or objects, used for batch enable/disable
class Group extends Collection {
    constructor(contents = []) {
        super(contents);
        this.enabled = true;

        this.className = "Group";
    }
    folder() {
        const folder = new Folder(this.contents);
        folder.displayName = this.displayName;
        folder.temp.group_state_disabled = !this.enabled

        window.dispatchEvent(treeUpdateEvent);
        return folder;
    }
}

// Folders do not have an enabled property. Passes parent's enabled/disabled.
class Folder extends Collection {
    constructor(contents = []) {
        super(contents);
        this.className = "Folder";
    }
    group() {
        const group = new Group(this.contents);
        group.displayName = this.displayName;

        if (this.temp.group_state_disabled) group.enabled = false;

        window.dispatchEvent(treeUpdateEvent);
        return group;
    }
}