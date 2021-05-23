import { Box, Button } from "@components/ui"
import { Avatar } from "@components/user/Avatar"
import { StoreState } from "@store/index"
import Link from "next/link"
import { useSelector } from "react-redux"

const Profile = () => {
	const user = useSelector((state:StoreState) => state.user)
	if(!user.profile){
		return false
	}
	return (
		<Box justify='center' flex>
			<Box>
				<Box flex justify='center' py={4}>
					<Avatar size={6} name={user.profile.username}/>
				</Box>
				{user.profile.completed_profile ?
					<Box></Box>
					:
					<Box>
						<Link href='/profile/edit'>
							<Button>Por favor, completá tu perfil</Button>
						</Link>
					</Box>
				}
			</Box>
		</Box>
	)
}

export default Profile