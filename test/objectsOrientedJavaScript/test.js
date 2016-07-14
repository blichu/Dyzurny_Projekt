var Figure = function (initialValue) {
    // prywatna zmienna 
    var color = initialValue;

    // prywatna metoda 
    var calculateValue = function() {
        return color * 2;
    }

    return {
        // publiczna metoda 
        getValue : function() {
            // uzycie prywatnej metody (nie uzywamy 'this')
            return calculateValue() - 1;
        }
    }
}

var obj = new Figure(10);
alert(obj.getValue());
alert(obj.someValue); // zwraca wartosc 'undefined'
alert(obj.calculateValue()); // blad