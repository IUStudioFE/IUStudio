/**
 * @description compile
 * @author wing
 */
import { lex } from './lexer';
import parse from './parse';
import generate from './generate';

const compile = function(template) {
    const tokens = getTokens(template);
    const ast = parse(tokens);
    return generate(ast);
}

export default compile;