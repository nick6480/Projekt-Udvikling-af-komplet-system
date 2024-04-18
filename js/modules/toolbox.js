// Some basic functions
export default class toolbox {
    constructor(){}
    
    createBtns(amount, parrent, text = [], id = [], classList = []) { // Creates btns
        for (let i = 0; i < amount; i++) {
            const btn = document.createElement('button');
            btn.textContent = text[i].charAt(0).toUpperCase() + text[i].slice(1);
            
            if (id.length > 0) { // If there is id's add them to the coresponding button
                btn.id = id[i];
            }
            if (classList.length > 0 ) { // Add the class to every button
                classList.forEach(className => {
                    btn.classList.add(className);
                });
            }

            parrent.appendChild(btn);
        }
    }
    clearElement(element){ //Clear all children from html element 
        element.innerHTML = ""
    }    
}