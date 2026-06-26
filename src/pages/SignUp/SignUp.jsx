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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Data
import { signUpData } from "./data";

function SignUp() {
  return (
    <Container disableGutters maxWidth={false}>
      <Grid container>
        {/* Left Column: Branding & Value Proposition */}
        <Grid size={6}>
          <Box>
            <Button startIcon={<ArrowBackIcon />} variant="text">
              Quay về Trang chủ
            </Button>

            {/* Logo */}
            <Stack direction="row" spacing={1}>
              <Box component="div" className="logo-box" />
              <Typography>LearnFlow</Typography>
            </Stack>

            <Typography>
              Bắt đầu hành trình học lập trình cùng LearnFlow
            </Typography>
            <Typography>
              Tham gia cùng hàng ngàn học viên khác để xây dựng kỹ năng lập
              trình bền vững qua các lộ trình học bài bản và dự án thực tế.
            </Typography>

            {/* Benefits Stack */}
            <Stack direction="column" spacing={2}>
              {signUpData.benefitsList.map((benefit, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <Box>{benefit.icon}</Box>
                      <Box>
                        <Typography>{benefit.title}</Typography>
                        <Typography>{benefit.description}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Right Column: Detailed Registration Form */}
        <Grid size={6}>
          <Box>
            <Typography>Tạo tài khoản</Typography>
            <Typography>
              Tạo tài khoản để bắt đầu học theo roadmap, luyện bài tập, tham gia
              contest và theo dõi tiến độ trên LearnFlow.
            </Typography>

            {/* Form Fields */}
            <Stack direction="column" spacing={2}>
              {/* Row: First Name & Username */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography>HỌ VÀ TÊN</Typography>
                  <TextField fullWidth placeholder="Nguyễn Văn A" />
                </Grid>
                <Grid size={6}>
                  <Typography>TÊN NGƯỜI DÙNG</Typography>
                  <TextField fullWidth placeholder="van_a_99" />
                </Grid>
              </Grid>

              {/* Email */}
              <Box>
                <Typography>EMAIL</Typography>
                <TextField fullWidth placeholder="email@vi-du.com" />
              </Box>

              {/* Password */}
              <Box>
                <Typography>MẬT KHẨU</Typography>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  type="password"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Confirm Password */}
              <Box>
                <Typography>XÁC NHẬN MẬT KHẨU</Typography>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  type="password"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Policy Agreement */}
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography>
                    Tôi đồng ý với <Link href="#">Điều khoản sử dụng</Link> và{" "}
                    <Link href="#">Chính sách bảo mật</Link> của LearnFlow.
                  </Typography>
                }
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                endIcon={<ArrowForwardIcon />}
              >
                Tạo tài khoản
              </Button>
            </Stack>

            {/* Divider */}
            <Box>
              <Typography>HOẶC TIẾP TỤC VỚI</Typography>
            </Box>

            {/* Social Registration buttons */}
            <Stack direction="row" spacing={2}>
              {signUpData.socialProviders.map((provider, index) => (
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

            {/* Redirect Sign In Action */}
            <Stack direction="row" justifyContent="center" spacing={0.5}>
              <Typography>Đã có tài khoản?</Typography>
              <Link href="#">Đăng nhập ngay</Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
