import Crawler from './Crawler';

const Transformer = Object.create( {

    datesAsObjects: function( arrayObjects, dateFields )
    {
        return arrayObjects.map( function( child )
        {
            for( var i = 0; i < dateFields.length; i++ )
            {
                var fieldValue = Crawler.selectNestedObject( child, dateFields[i] );
                var fieldDate = new Date( fieldValue );

                if( isNaN( fieldDate.getTime() ) )
                {
                    throw `Field ${field[i]} has an invalid date value: ${fieldValue}`;
                }

                Crawler.setNestedObjectValue( child, dateFields[i], fieldDate );
            }
        } );
    }

} );

export default Transformer;