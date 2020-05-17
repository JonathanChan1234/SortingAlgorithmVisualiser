import React from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { RouteComponentProps, LinkProps, withRouter, Link } from 'react-router-dom';

interface ListItemLinkProps {
	primary: string;
	to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, primary }) => {
	const renderLink = React.useMemo(
		() =>
			React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
				<Link to={to} ref={ref} {...itemProps} />
			)),
		[to]
	);
	return (
		<li>
			<ListItem button component={renderLink}>
				<ListItemText primary={primary} />
			</ListItem>
		</li>
	);
};

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	listItem: {
		textDecoration: 'none',
	},
});

interface SideMenuListProps {
	toggleDrawer: (state: boolean) => void;
}

const SideMenuList: React.FC<RouteComponentProps & SideMenuListProps> = ({ toggleDrawer }) => {
	const classes = useStyles();
	return (
		<div
			className={classes.list}
			role='presentation'
			onClick={() => toggleDrawer(false)}
			onKeyDown={() => toggleDrawer(false)}>
			<List>
				<ListItemLink to='/' primary='Visualiser' />
				<ListItemLink to='/competition' primary='Competition' />
			</List>
		</div>
	);
};

export default withRouter(SideMenuList);
