class Placeholder {

    constructor( slug, defaultValue = undefined, type = 'string' ){
        this.slug = slug
        this.defaultValue = defaultValue
        this.type = type
    }

    hasDefault(){
        return typeof this.defaultValue === 'undefined'
    }

    getTemplate(){
        return '{{ ' + this.slug + ' }}'
    }

}

module.exports = Placeholder
