import * as fjsxObj from '@fjsx/runtime';

declare global {
	var fjsx: typeof fjsxObj;
}

global['fjsx'] = fjsxObj;
