export const getAntFormRules = (rules) => {
    let antFormRules = []
    if(rules){
        rules.forEach(rule => {
            if(rule.required){
                antFormRules.push({ required: true, message: rule.message })
            }
        })
    }
    return antFormRules
}