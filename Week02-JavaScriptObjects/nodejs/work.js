var person = {
    firstName: 'Taylor',
    lastName: 'Yee',
    fullName: function() {
        'use strict';
        console.log(this.firstName + ' ' + this.lastName);
    }
};

var calculator = {
    operator01: -1,
    operator02: -1,
    add: function() {
        'use strict';
        return this.operator01 + this.operator02;
    },
    subtract: function() {
        'use strict';
        return this.operator01 - this.operator02;
    }
};

var divider = function(title) {
    'use strict';
    console.log('====================================');
    console.log(title);
    console.log('====================================');
};

calculator.operator01 = person.firstName.length;
calculator.operator02 = person.lastName.length;
calculator.multiply = function() {
    'use strict';
    return this.operator01 * this.operator02;
};

divider('Name');
console.log(person.firstName);
console.log(person.lastName);
person.fullName();
divider('Calculator');
console.log('operator01 = ' + calculator.operator01);
console.log('operator02 = ' + calculator.operator02);
console.log('Add: ' + calculator.add());
console.log('Subtract: ' + calculator.subtract());
console.log('Multiply: ' + calculator.multiply());
