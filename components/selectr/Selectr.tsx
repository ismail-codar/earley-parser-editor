import Selectr from 'mobius1-selectr';
import 'mobius1-selectr/dist/selectr.min.css';
import onload from 'on-load';

export const Selecttr = () => {
	const dom = <select />;

	onload(
		dom,
		function(el) {
			new Selectr(dom, {
				taggable: true,
				tagSeperators: [ ',', '|' ],
				data: [
					{
						text: 'Group 1',
						children: [
							{
								value: 'value-1',
								text: 'Value 1'
							},
							{
								value: 'value-2',
								text: 'Value 2'
							},
							{
								value: 'value-3',
								text: 'Value 3'
							},
							{
								value: 'value-4',
								text: 'Value 4'
							}
						]
					},
					{
						text: 'Group 2',
						children: [
							{
								value: 'value-5',
								text: 'Value 5'
							},
							{
								value: 'value-6',
								text: 'Value 6'
							},
							{
								value: 'value-7',
								text: 'Value 7'
							},
							{
								value: 'value-8',
								text: 'Value 8'
							}
						]
					}
				]
			});
		},
		function(el) {
			console.log('out of the dom');
		}
	);

	return dom;
};
