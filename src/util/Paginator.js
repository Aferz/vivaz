export default function Paginator( data, itemsPerPage )
{
    this.totalRecords   = data.length;
    this.recordsPerPage = itemsPerPage;
    
    resolvePages.call( this, data, itemsPerPage );
}

Paginator.prototype = {
    
    totalRecords: undefined,
    
    recordsPerPage: undefined,
    
    totalPages: undefined,
    
    pages: [],
    
    currentIndex: 1,
    
    page: function( pageNumber )
    {
        if( pageNumber > this.totalPages )
        {
            pageNumber = this.totalPages;
        }
        else if( pageNumber < 1 )
        {
            pageNumber = 1;
        }
        
        this.currentIndex = pageNumber || 1;
        
        return this.pages[ this.currentIndex - 1 ];
    },
    
    current: function()
    {
        return this.pages[ this.currentIndex - 1 ];
    },
    
    next: function()
    {
        return this.page( this.currentIndex + 1 );
    },
    
    previous: function()
    {
        return this.page( this.currentIndex - 1 );
    }
}

var resolvePages = function( data, itemsPerPage )
{
    itemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;
    
    var pages = [];
    
    for( var i = 0; i < data.length; i += itemsPerPage )
    {
        pages.push( data.slice( i, i + itemsPerPage ) );
    }
    
    this.pages = pages;
    this.totalPages = this.pages.length;
    
    return this;
}