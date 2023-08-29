// @deno-types="npm:@types/svg-parser"
import { parse } from "npm:svg-parser"

const file = await Deno.readTextFile("5317.svg")

const parsed = parse(file)

interface ElementNode {
    type: 'element';
    tagName?: string | undefined;
    properties?: Record<string, string|number> | undefined;
    children: Array<Node>;
    value?: string | undefined;
    metadata?: string | undefined;
}

type Node = ElementNode

const root = parsed.children[0] as Node

const select =
    (
        propName: string,
        selector: string
    ) =>
    (node: Node) =>
    node.children
        .find(child => child.properties?.[propName] == selector)


console.log(
    select("data-name", "본체")(root)
    ?.children.map(child => child.tagName)
)