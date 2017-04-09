class Placeholder {

    constructor( name, template, defaultValue = undefined, type = 'string' ){
        this.name = name
        this.template = template
        this.defaultValue = defaultValue
        this.type = type
    }

}

module.exports = Placeholder
