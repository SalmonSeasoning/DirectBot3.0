// easier than var = var ? var : default;
// ex. var = TernaryIf(var, default);
function TernaryIf(cond, def)
{
    if(cond) return cond;
    return def;
}
// for some reason ./ will refer to the project dir and not
// -the current working directory.
function ReadIfExistsSync(fileName)
{
    if(require("fs").existsSync(fileName))
        return require("fs").readFileSync(fileName);
}
module.exports = {
    TernaryIf: TernaryIf,
    ReadIfExistsSync: ReadIfExistsSync
}