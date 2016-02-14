import Config from '../config/Config';

export default function Where( field, operator, value, $not )
{
    this.name     = $not ? 'whereNot' : 'where';
    this.not      = $not || false;
    
    this.field    = field;
    this.operator = operator;
    this.value    = value;

    this.resolveArguments();
}

Where.prototype = {

    field: undefined,

    operator: undefined,

    value: undefined,

    not: false,

    resolveArguments: function( args )
    {
        if( !this.field )
        {
            throw `No field provided for "${this.name}" clause.`;
        }

        if( this.operator === null || this.operator === undefined || this.operator === false || this.operator === true )
        {
            invalidOperatorException.call( this, this.operator );
        }

        let hasValidOperator = Config.validOperators.indexOf( this.operator ) > -1;

        if( hasValidOperator )
        {
            // This handles .whereUndefined(), whereNull(), whereFalse() or whereTrue()
            if( this.operator !== '===' && this.operator !== '!==' && 
              ( this.value === null || this.value === undefined || this.value === false || this.value === true ) )
            {
                invalidOperatorException.call( this, this.value );
            }
        }
        else if( !hasValidOperator && this.value === undefined )
        {
            this.value = this.operator;
            this.operator = '=';
        }
        else
        {
            throw `Unrecognized "${this.operator}" operator for "${this.name}" clause.`;
        }

        return this;
    },

    resolve: function( elementValue )
    {
        let result;

        switch( this.operator )
        {
            case '===':
                result = elementValue === this.value;
                break;
                
            case '=':
                result = elementValue == this.value;
                break;
                
            case '!==':
                result = elementValue !== this.value;
                break;

            case '!=':
            case '<>':
                result = elementValue != this.value;
                break;
            
            case '<=':
                result = elementValue <= this.value;
                break;
                
            case '<':
                result = elementValue < this.value;
                break;
                
            case '>=':
                result = elementValue >= this.value;
                break;
                
            case '>':
                result = elementValue > this.value;
                break;
        }
        
        return this.not ? !result : result;
    }
}

let invalidOperatorException = function( value )
{
    let text = value === null ? 'whereNull()' :
               value === undefined ? 'whereUndefined()' :
               value === true ? 'whereTrue()' : 'whereFalse()';
    
    throw `No correct value provided for "${this.name}" clause. For better assertion use ${text} instead.`;
}