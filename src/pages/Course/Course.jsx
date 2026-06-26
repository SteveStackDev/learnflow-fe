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
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import { courseData } from "./data";

// Images
import heroUrl from "~/assets/images/About/team_1.webp";

function Course() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Chip label="Nâng tầm kỹ năng lập trình" variant="contained" />
            <Typography>
              Khám phá khóa học phù hợp với mục tiêu của bạn
            </Typography>
            <Typography>
              Hệ thống khóa học từ cơ bản đến nâng cao, được thiết kế bởi các
              chuyên gia để giúp bạn trở thành lập trình viên thực thụ.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Bắt đầu học ngay</Button>
              <Button variant="outlined">Tìm hiểu thêm</Button>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Box component="img" src={heroUrl} alt="Hero Image" />
          </Grid>
        </Grid>
      </Container>

      {/* Search & Stats Section */}
      <Container disableGutters maxWidth={false}>
        <Stack direction="row" spacing={2}>
          <TextField placeholder="Tìm khóa học bạn muốn bắt đầu..." />
          <TextField select defaultValue="popular">
            <MenuItem value="popular">Sắp xếp: Phổ biến nhất</MenuItem>
          </TextField>
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography>120+</Typography>
              <Typography>Khóa học</Typography>
            </Box>
            <Box>
              <Typography>15</Typography>
              <Typography>Lĩnh vực</Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* Filter Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Tất cả khóa học</Typography>
        <Typography>
          Lựa chọn lộ trình học tập tối ưu cho sự nghiệp của bạn.
        </Typography>
        <Stack direction="row" spacing={2}>
          {courseData.courseCategories.map((item, index) => (
            <Button
              key={index}
              variant={index === 0 ? "contained" : "outlined"}
            >
              {item}
            </Button>
          ))}
        </Stack>
      </Container>

      {/* Courses Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {courseData.coursesSection.map((obj, index) => (
            <Grid key={index} size={3}>
              <Card>
                <Chip label={obj.level} />
                <CardMedia
                  component="img"
                  height="140"
                  image={obj.imageUrl}
                  alt={obj.title}
                />
                <CardContent>
                  <Typography>{obj.title}</Typography>
                  <Typography>{obj.description}</Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography>{obj.lessons}</Typography>
                    <Typography>{obj.students}</Typography>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">Xem chi tiết</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row">
          <Pagination count={7} page={1} />
        </Stack>
      </Container>

      {/* Reason Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Tại sao nên học khóa học tại LearnFlow?</Typography>
        <Typography>
          Chúng tôi mang đến môi trường học tập trình khác biệt, tập trung vào
          kết quả và sự phát triển lâu dài.
        </Typography>
        <Grid container spacing={2}>
          {courseData.reasonSection.map((obj, index) => (
            <Grid key={index} size={4}>
              <Card>
                <CardContent>
                  <Box>{obj.icon}</Box>
                  <Typography>{obj.title}</Typography>
                  <Typography>{obj.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Câu hỏi thường gặp</Typography>
        <Box>
          {courseData.faqSection.map((obj, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span">{obj.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{obj.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Container>
  );
}

export default Course;
