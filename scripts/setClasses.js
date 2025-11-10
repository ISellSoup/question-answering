const treeUpdateEvent = new Event("application:treeUpdate");

class Collection {
    constructor(contents = []) {
        this.contents = contents;
        this.displayName = "";

        this.className = "Collection";
    }
}

class SubCollection extends Collection {
    constructor(contents = []) {
        super(contents);
        this.parent = null;

        this.className = "SubCollection";
    }
}

class WordBankEntry {
    constructor(value = "") {
        this.value = value;
        this.parent = null;
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
        this.enabled = true; // This property doesn't work on top-level WordBanks

        this.className = "WordBank";
    }
    isTopLevel() {
        let isTopLevel = true;

        function checkParent(item) {
            if (item instanceof WordBank) isTopLevel = false;

            if (item.parent) {
                checkParent(item.parent);
            }
        }
        checkParent(this.parent);
        return isTopLevel;
    }
}

class QuestionAsnwerPair {
    constructor(question = "", answer = "") {
        this.question = question;
        // Can be a string or a WordBank
        this.answer = answer;
        this.parent = null;
        this.enabled = true;

        this.className = "QuestionAsnwerPair";
    }
}

// Groups of other Groups or objects, used for batch enable/disable. The top level of a WordBank cannot be put in a Group.
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

// Folders can contain any objects, but do not have an enabled property.
class Folder extends SubCollection {
    constructor(contents = []) {
        super(contents);
        
        this.className = "Folder";
    }
    convertToGroup() {
        this.contents.forEach(item => {
            if (item instanceof WordBank) {
                if (item.isTopLevel()) return; // Groups cannot contain top-level WordBanks
            }
        });
        const group = new Group(this.contents);
        group.displayName = this.displayName;

        window.dispatchEvent(treeUpdateEvent);
        return group;
    }
}

class Set extends Collection {
    constructor() {
        super([]);
        this.description = "";

        // Indexes to objects in contents or direct objects (Groups count as objects)
        this.body = [];

        this.className = "Set";
    }
}