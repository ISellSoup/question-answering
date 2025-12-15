export default scripts = {
    editor: {
        priority: 0,
        styles: ["styles.css"],
        script: ()=>{}
    }
}

export const editorAPI = {
    AddValueEdit: (path,key,data={})=>{
        // Should return object that has events and methods (change?, set?, etc.), maybe add another classes script for these?
    },
    RemoveValueEdit: (path,key,data={})=>{
        // This should be a method of the editor element class
    },
    GetEditorElement: ()=>{
        // Add editor element class?
    },
}