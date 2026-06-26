// MUI
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HomeIcon from "@mui/icons-material/Home";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

// Data
import { notFoundData } from "./data";

function NotFound() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Main 404 Content Section */}
      <Stack direction="column" alignItems="center" spacing={3}>
        {/* Large 404 Background Text */}
        <Typography>404</Typography>

        <Typography>Oops! Có vẻ bạn vừa đi lạc khỏi LearnFlow</Typography>

        <Typography>
          Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc được chuyển sang
          một địa chỉ mới. Đừng lo, các kiến thức lập trình vẫn đang chờ bạn ở
          các trang khác!
        </Typography>

        {/* Quick Navigation Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center">
          {notFoundData.navButtons.map((btn, index) => (
            <Button
              key={index}
              variant={btn.variant}
              startIcon={btn.icon === "HomeIcon" ? <HomeIcon /> : null}
            >
              {btn.text}
            </Button>
          ))}
        </Stack>
      </Stack>

      {/* Support / Contact Footer Box */}
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" justifyContent="between" alignItems="center">
              <Box>
                <Typography>Cần thêm sự hỗ trợ?</Typography>
                <Typography>
                  Đội ngũ LearnFlow luôn sẵn sàng giải đáp thắc mắc và hỗ trợ
                  bạn trong quá trình học tập.
                </Typography>
              </Box>
              <Button variant="contained" startIcon={<HeadsetMicIcon />}>
                Trang liên hệ
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default NotFound;
