import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  styled
} from '@mui/material';

import { MoreVert } from '@mui/icons-material';
import React from 'react';
import imageSrc from '../../../../resources/marketplace_images/marketplace_image.png';
import { red } from '@mui/material/colors';
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../../redux/store';
import { saveProject } from '../../helperFunctions/projectGetSaveDel';

interface Project {
  comments: string[]
  createdAt: Date
  likes: number
  name: string
  project: object
  published: boolean
  userId: number
  username: string
  _id: number
}

const ITEM_HEIGHT = 48;
const MarketplaceCard = ({proj} :{proj: Project}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const state = useSelector((store:RootState) => store.appState);
  console.log('HEY', state)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Card
        sx={{ maxWidth: 384, backgroundColor: '#1E1E1E', borderRadius: '12px' }}
      >
        <CardMedia
          sx={{ borderRadius: '12px', height: 200 }}
          component="img"
          height="194"
          image={imageSrc}
          alt="component buttons"
        />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          }
          title={proj.name}
          subheader={proj.username}
        />
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
              backgroundColor: '#1E1E1E'
            }
          }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              color: '#C6C6C6'
            }}
          >
            Clone
          </MenuItem>
        </Menu>
      </Card>
    </>
  );
};

export default MarketplaceCard;
