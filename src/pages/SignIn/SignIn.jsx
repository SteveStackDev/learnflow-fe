// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Data
import { signInData } from "./data";

function SignIn() {
  return (
    <Container disableGutters maxWidth={false}>
      <Grid container>
        {/* Left Column: Welcome & Features Infographic */}
        <Grid size={6}>
          <Box>
            <Button startIcon={<ArrowBackIcon />} variant="text">
              Trang chủ
            </Button>

            {/* Logo */}
            <Stack direction="row" spacing={1}>
              <Box component="div" className="logo-box" />
              <Typography>LearnFlow</Typography>
            </Stack>

            <Typography>Chào mừng bạn quay trở lại!</Typography>
            <Typography>
              Tiếp tục hành trình trở thành lập trình viên chuyên nghiệp với kho
              bài tập và lộ trình học cá nhân hóa.
            </Typography>

            {/* Features List Grid */}
            <Grid container spacing={2}>
              {signInData.featuresList.map((feat, index) => (
                <Grid key={index} size={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack direction="row" spacing={2}>
                        <Box>{feat.icon}</Box>
                        <Box>
                          <Typography>{feat.title}</Typography>
                          <Typography>{feat.description}</Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Right Column: Dynamic Form Section */}
        <Grid size={6}>
          <Box>
            <Typography>Đăng nhập</Typography>
            <Typography>
              Chào mừng bạn trở lại với cộng đồng LearnFlow.
            </Typography>

            {/* Credential Form */}
            <Stack direction="column" spacing={2}>
              <Box>
                <Typography>Địa chỉ Email</Typography>
                <TextField
                  fullWidth
                  placeholder="example@email.com"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="between">
                  <Typography>Mật khẩu</Typography>
                  <Link href="#">Quên mật khẩu?</Link>
                </Stack>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  type="password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<Typography>Ghi nhớ đăng nhập</Typography>}
              />

              <Button variant="contained" fullWidth size="large">
                Đăng nhập
              </Button>
            </Stack>

            {/* Social Authentication Splitter */}
            <Box>
              <Typography>Hoặc tiếp tục với</Typography>
            </Box>

            {/* Social Authentication Buttons */}
            <Stack direction="row" spacing={2}>
              {signInData.socialProviders.map((provider, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  fullWidth
                  startIcon={<Box>{provider.icon}</Box>}
                >
                  {provider.name}
                </Button>
              ))}
            </Stack>

            {/* Redirect Register Action */}
            <Stack direction="row" justifyContent="center" spacing={0.5}>
              <Typography>Chưa có tài khoản?</Typography>
              <Link href="#">Đăng ký ngay</Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
