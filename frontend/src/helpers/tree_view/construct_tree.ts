import { Node } from "../interfaces/TreeNode";

let root_path: Array<any> = [];

export const find_all_relatives = (id, array) => {
    const related_indexes = array
        .filter(item => item.get_parent() === id)
        .map(item => item.get_id())

    related_indexes.push(id)
    let has_more = true;

    while(has_more) {
        const has_more_relatives = array.filter(item => 
            related_indexes.includes(item.get_parent()) && !related_indexes.includes(item.get_id())
        )

        if (has_more_relatives.length === 0) {
            has_more = false
            return related_indexes
        }
        has_more_relatives.map(item => related_indexes.push(item.get_id()))
    }

    return related_indexes
}

export const build_path = (array: Array<any>, parent_id, path) => {
    array.map((item, index) => {
      const copy_path = [...path]
      if (item.id === parent_id) {
        copy_path.push(index)
        root_path = copy_path
        return
      }
        copy_path.push(index)
        copy_path.push("children")
        build_path(item.children, parent_id, copy_path)
    })

    return root_path
}

export const construct_tree = (node_list: Array<Node>): Array<any> => {
    const node_list_working_copy = [...node_list]
    const tree = [];

    node_list_working_copy.map(item => {
        const render_item = item.get_render_data()
        if (!render_item.parent) {
            tree.push(render_item)
        } else {
            const returned_path = build_path(tree, render_item.parent, [])
            let track_item: any = tree
            returned_path.map(q_item => {
                track_item = track_item[q_item]
            })
            track_item.children.push(render_item)
        }
    })

    return tree
}