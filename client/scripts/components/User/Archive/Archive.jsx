import React from 'react/addons';
import {merge} from '../../../merge';
import {ResponsiveComponent} from '../../ResponsiveComponent';
import {FilterType} from './FilterType';
import {DisclosureStore} from '../../../stores/DisclosureStore';
import {DisclosureTable} from './DisclosureTable';
import {DisclosureActions} from '../../../actions/DisclosureActions';

export class Archive extends ResponsiveComponent {
	constructor() {
		super();
		this.commonStyles = {
		};

		let storeState = DisclosureStore.getState();
		this.state = {
			applicationState: storeState.applicationState,
			archivedDisclosures: storeState.archivedDisclosures
		};

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		DisclosureStore.listen(this.onChange);
		DisclosureActions.loadArchivedDisclosures();
	}

	componentWillUnmount() {
		DisclosureStore.unlisten(this.onChange);
	}

	onChange() {
		let storeState = DisclosureStore.getState();
		this.setState({
			applicationState: storeState.applicationState,
			archivedDisclosures: storeState.archivedDisclosures
		});
	}

	shouldComponentUpdate() {return true;}

	renderMobile() {
		// let mobileStyles = {
		// };
		// let styles = merge(this.commonStyles, mobileStyles);

		// return (
		// 	<span style={merge(styles.container, this.props.style)}>
		// 		Archive
		// 	</span>
		// );
	}

	renderDesktop() {
		let desktopStyles = {
			container: {
				width: '100%',
				background: '#DDD'
			},
			sidebar: {
				width: 225,
				display: 'inline-block',
				backgroundColor: '#202020',
				verticalAlign: 'top',
				paddingTop: 125
			},
			content: {
				display: 'inline-block',
				verticalAlign: 'top',
				borderTop: '8px solid ' + window.config.colors.two
			},
			header: {
				backgroundColor: 'white',
				padding: '17px 0 17px 50px',
				position: 'relative',
				borderBottom: '1px solid #e3e3e3'
			},
			heading: {
				fontSize: '33px',
				margin: '0 0 0 0',
				textTransform: 'uppercase',
				fontWeight: 300,
				color: window.config.colors.one
			},
			table: {
				margin: '30px 30px'
			}
		};
		let styles = merge(this.commonStyles, desktopStyles);

		let disclosures;
		if (this.state.applicationState.archiveFilter === 'PROJECT') {
			disclosures = this.state.archivedDisclosures.filter((disclosure) => {
				return disclosure.type === 'PROJECT';
			});
		}
		else if (this.state.applicationState.archiveFilter === 'ANNUAL') {
			disclosures = this.state.archivedDisclosures.filter((disclosure) => {
				return disclosure.type === 'ANNUAL';
			});
		}
		else {
			disclosures = this.state.archivedDisclosures;
		}

		return (
			<span className="flexbox row fill" style={merge(styles.container, this.props.style)}>
				<span style={styles.sidebar}>

					<FilterType type="ALL" active={this.state.applicationState.archiveFilter === 'ALL'}>
						ALL DISCLOSURES
					</FilterType>
					<FilterType type="PROJECT" active={this.state.applicationState.archiveFilter === 'PROJECT'}>
						PROJECT DISCLOSURES
					</FilterType>
					<FilterType type="ANNUAL" active={this.state.applicationState.archiveFilter === 'ANNUAL'}>
						ANNUAL DISCLOSURES
					</FilterType>
				</span>
				<span className="fill" style={styles.content}>
					<div style={styles.header}>
						<h2 style={styles.heading}>Disclosure Archive</h2>
					</div>

					<div style={styles.table}>
						<DisclosureTable disclosures={disclosures} />
					</div>
				</span>
			</span>
		);
	}
}