import AddTaskIcon from '@mui/icons-material/AddTask';
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { MenuButton } from "common/components"
import { ResultCode } from "common/enums"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { baseApi } from "../../../app/baseApi"
import { useLogoutMutation } from "../../../features/auth/api/authAPI"
import { Typography } from "@mui/material"

export const Header = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [logout] = useLogoutMutation()

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem("sn-token")
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
          <IconButton color="inherit">
            <AddTaskIcon fontSize={'large'}/>
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap><b>{"Todo Planner"}</b></Typography>
        </div>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
