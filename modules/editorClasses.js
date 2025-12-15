import * as events from "/modules/applicationEvents.js";

export class EditorElement extends EventTarget {
    constructor(linkedItem=null,title=null) {
        super()
        this.title = title // Maybe when title is null display no title
        this.linkedItem = linkedItem
        this.values = []
    }
}

export class Value extends EventTarget {
    #linkedObject = null
    #value
    constructor(trackedValue,linkedObject=null,type="number",title=null) {
        super()
        this.title = title ?? trackedValue
        this.editType = type // number | button | text | really anything the developer wants
        this.#linkedObject = linkedObject
        this.trackedValue = trackedValue
        this.editCallback = ()=>{
        }
    }
    set value(value) {
        if (this.#linkedObject) {
            this.linkedObject[trackedValue] = value
        }
        if (value!==this.#value) {
            this.dispatchEvent(changed)
        }
        this.#value = value
    }
    get value() {
        return this?.linkedObject[this.trackedValue] ?? this.#value;
    }
    set linkedObject(value) {
        value = value ?? null
    }
}