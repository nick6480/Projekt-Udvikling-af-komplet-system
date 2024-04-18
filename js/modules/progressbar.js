// Handeling the progressbars
export default class Progressbar {
    constructor(element, value) {
        this.element = element;
        this.value = 0;
    }
    
    
    setvalue(endValue){ // Changes the percentage in the progressbar

        let startValue = this.value
        let speed = 1
        
        let progress = setInterval(() => { // Animates the progressbar and number

            if (startValue < endValue) // if it should count forwards or backwards
                startValue++
            else
                startValue--
            this.element.style.background = `conic-gradient(#7d2ae8 ${startValue/100*360}deg, #ededed 0)`

            if(startValue == endValue) // Stops at end value
                clearInterval(progress)
                this.value = startValue
         

        }, speed)
        this.element.children[0].textContent = `${endValue}%`
        
        this.value = endValue

        

    }

}





