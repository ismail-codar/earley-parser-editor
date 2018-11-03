import { jsonStateMachine } from '../src/state-machine/json';
import { StateCtrl } from '../src/types/state-ctrl';
import { IStateMachine } from '../src/state-machine/base';

jasmine.getEnv().throwOnExpectationFailure(true);

/**
{
  menu: {
    id: 1,
    value: "File",
    popup: {
      menuitem: [{ value: "New" }, { value: "Open" }]
    },
    open: false
  }
}
 */

it(`{}`, () => {
	const expr = jsonStateMachine;

	const ctrl = new StateCtrl(expr);
	expect(ctrl.rootTreeNode.data['name']).toEqual('json');
	let objectNode = ctrl.add(ctrl.rootTreeNode, 'object') as IStateMachine<'rule'>;
	expect(objectNode.data['name']).toEqual('object');
	expect(ctrl.tree.childrenCount(ctrl.rootTreeNode)).toEqual(1);
	expect(ctrl.tree.childrenCount(objectNode)).toEqual(3); // zeroOrMany LCurly ve RCurly eklenir. Daha sonra objectItem listesi zeroOrMany içine eklenir
	expect(ctrl.toString()).toEqual('{}');

	const zeroOrManyNode = ctrl.getSubNode(objectNode, {
		type: 'zeroOrMany'
	}) as IStateMachine<'zeroOrMany'>;
	const objectItem_id_1 = ctrl.add(zeroOrManyNode, 'objectItem') as IStateMachine<'rule'>;
	expect(ctrl.tree.childrenCount(objectItem_id_1)).toEqual(3); // StringLiteral, Colon, value eklenmiş olmalı
	expect(ctrl.tree.childrenCount(zeroOrManyNode)).toEqual(1);
});
