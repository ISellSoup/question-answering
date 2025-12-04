const treeUpdateEvent = new Event("application:treeUpdate");
let bodyAllowList = [ // Only these classes can be added to the set's body
    "ContentReference",
    "Group",
    "Folder",
    "QuestionAnswersPair"
]
let contentsDenyList = [ // These classes cannot be added to the set's contents
    
]

class ApplicationObject extends EventTarget {
    constructor() {
        super()
        this.temp = {
            parent:null,
            deleted:false
        } // Values inside temp are not saved
        this.meta = {} // Saved but not used by the application. Intended for extensions.
    }
    referenceRemoved(key) {
        object[key] = undefined
    }
    treeUpdate() {}
}

class Collection extends ApplicationObject {
    constructor(contents = []) {
        super()
        this.contents = contents;
        this.displayName = "";
    }
    treeUpdate() {
        this.contents.forEach(child => {
            child.parent = this
            child.treeUpdate()
        })
    }
}

class ApplicationSet extends Collection {
    constructor() {
        super([new Folder(), new Folder()]); // First folder is content, second is body
        this.description = "";

        this.body = [];
    }
}

class ContentReference extends ApplicationObject { // Can be used in content for better organization
    constructor() {
        super()
        // NEVER in the future make this class able to store multiple references. Put these in a group instead
        this.path = [];
        this.temp.target = null; 
        this.enabled = true;
    }
    referenceRemoved(key) {
        super.referenceRemoved(key)
        this.path = getAbsolutePath(this.temp.target)
    }
}

class WordBank extends Collection {
    constructor(contents = []) {
        super(contents);
        this.enabled = true;
    }
}

class WordBankEntry extends ApplicationObject {
    constructor(value = "") {
        super()
        this.value = value;
        this.enabled = true;
    }
    convertToWordBank() {
        window.dispatchEvent(treeUpdateEvent);
        return new WordBank([this]); // Make sure to let the user name the wordbank immediately after conversion
    }
}

class QuestionAnswersPair extends Collection {
    constructor(question = "", answers = []) {
        super()
        this.question = question;
        // Can be a string or a WordBank
        this.contents = answers;
        this.enabled = true;
    }
}

// Groups of other Groups or objects, used for batch enable/disable
class Group extends Collection {
    constructor(contents = []) {
        super(contents);
        this.enabled = true;
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
    }
    group() {
        const group = new Group(this.contents);
        group.displayName = this.displayName;

        if (this.temp.group_state_disabled) group.enabled = false;

        window.dispatchEvent(treeUpdateEvent);
        return group;
    }
    passEnabled() {
        return this.temp.parent?.enabled ?? this.temp.parent?.passEnabled() ?? true
    }
}