// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";
import aboutUrl from "~/assets/images/Home/about.webp";

// Data
import { homeData } from "./data";

function Home() {
  return (
    <>
      <Container disableGutters maxWidth={false}>
        {/* Hero Section */}
        <Container disableGutters maxWidth={false}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Stack direction="column" spacing={2}>
                <Chip
                  label="Mới: Thử thách 30 ngày Java Spring Boot"
                  variant="contained"
                />
                <Typography>
                  Dòng chảy học tập, kiến tạo tương lai lập trình viên
                </Typography>
                <Typography>
                  Học lập trình theo lộ trình bài bản, luyện tập coding
                  challenge mỗi ngày và theo dõi tiến độ của riêng bạn trên nền
                  tảng hiện đại nhất.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained">Bắt đầu ngay</Button>
                  <Button variant="outlined">Xem lộ trình</Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={6}>
              <Box component="img" src={heroUrl} alt="Hero Image"></Box>
            </Grid>
          </Grid>
        </Container>

        {/* Logo List Section */}
        <Container disableGutters maxWidth={false}>
          <Stack direction="column" spacing={2}>
            <Typography>Công nghệ đào tạo cốt lỗi</Typography>
            {/* Marquee */}
          </Stack>
        </Container>

        {/* About Section */}
        <Container disableGutters maxWidth={false}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Box component="img" src={aboutUrl} alt="About Image"></Box>
            </Grid>

            <Grid size={6}>
              <Stack direction="column" spacing={2}>
                <Typography>Tại sao chọn LearnFlow?</Typography>
                <Typography>
                  Khác với các nền tảng giải đố thuần túy như LeetCode có thể
                  gây ngợp cho người mới, LearnFlow được thiết kế như một
                  **người dẫn đường**. Chúng tôi không chỉ đưa bài tập, chúng
                  tôi xây dựng tư duy lập trình từ những viên gạch đầu tiên.
                </Typography>
                {homeData.aboutSection.map((obj, index) => {
                  return (
                    <Stack key={index} direction="row" spacing={2}>
                      {obj.icon}
                      <Stack direction="column" spacing={2}>
                        <Typography>{obj.title}</Typography>
                        <Typography>{obj.description}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
                <Button variant="contained">Tìm hiểu thêm về LearnFlow</Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        {/* Figure Section */}
        <Container disableGutters maxWidth={false}>
          <Grid container spacing={2}>
            {homeData.figureSection.map((obj, index) => {
              return (
                <Grid key={index} size={3}>
                  <Stack direction="column" spacing={2}>
                    <Typography>{obj.title}</Typography>
                    <Typography>{obj.description}</Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Feature Section */}
        <Container disableGutters maxWidth={false}>
          <Typography>Tính năng nổi bật</Typography>
          <Typography>
            Mọi công cụ bạn cần để trở thành một lập trình viên xuất sắc được
            gói gọn trong một nền tảng duy nhất.
          </Typography>
          <Grid container spacing={2}>
            {homeData.featureSection.map((obj, index) => {
              return (
                <Grid key={index} size={3}>
                  {obj.icon}
                  <Typography>{obj.title}</Typography>
                  <Typography>{obj.description}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Team Section */}
        <Container disableGutters maxWidth={false}>
          <Typography>Đội ngũ phát triển</Typography>
          <Typography>
            Những người đứng sau sứ mệnh phổ cập lập trình chất lượng cao.
          </Typography>
          <Grid container spacing={2}>
            {homeData.teamSection.map((obj, index) => {
              return (
                <Grid key={index} size={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="Team Image"
                      height="250"
                      image={obj.imageUrl}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {obj.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {obj.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* FAQ Section */}
        <Container disableGutters maxWidth={false}>
          <Box>
            {homeData.faqSection.map((obj, index) => {
              return (
                <Accordion key={index} defaultExpanded={index === 0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${index + 1}-panel${index + 1}-content`}
                    id={`${index + 1}-panel${index + 1}-header`}
                  >
                    <Typography component="span">{obj.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{obj.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Container>

        {/* Contact Section */}
        <Container disableGutters maxWidth={false}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography>Bạn cần tư vấn lộ trình?</Typography>
              <Typography>
                Để lại thông tin, đội ngũ chuyên gia của LearnFlow sẽ liên hệ và
                tư vấn lộ trình học tập phù hợp nhất với mục tiêu nghề nghiệp
                của bạn.
              </Typography>
            </Grid>

            <Grid size={6}>
              <Box component="form">
                <Stack direction="column" spacing={2}>
                  <TextField
                    label="Họ và tên"
                    variant="outlined"
                    placeholder="Nhập họ và tên của bạn"
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    placeholder="example@email.com"
                    fullWidth
                  />
                  <TextField
                    label="Nội dung"
                    variant="outlined"
                    placeholder="Tôi muốn tìm hiểu về lộ trình Frontend..."
                    multiline
                    maxRows={5}
                  />
                </Stack>
              </Box>

              <Stack direction="column" spacing={2}>
                <Button variant="contained">Gửi yêu cầu</Button>
                <Button variant="outlined">Xem trang liên hệ chi tiết</Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Home;
