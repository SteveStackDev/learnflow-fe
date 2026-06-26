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
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import { problemData } from "./data";

function Problem() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* 1. Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid size={7}>
            <Typography>
              Luyện tập bài tập lập trình để biến kiến thức thành kỹ năng thật
            </Typography>
            <Typography>
              Rèn luyện tư duy logic, cấu trúc dữ liệu và giải thuật thông qua
              hệ thống bài tập thực tiễn từ cơ bản đến nâng cao. Mỗi thử thách
              là một bước tiến gần hơn tới sự nghiệp lập trình chuyên nghiệp.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Bắt đầu ngay</Button>
              <Button variant="outlined">Xem hướng dẫn</Button>
            </Stack>
          </Grid>
          <Grid size={5}>
            {/* Mockup khung code mô phỏng ở góc phải ảnh */}
            <Box component="pre">
              <code>{`// Tìm đường đi ngắn nhất\nint dijkstra(vector<vector<pair<int, int>>>& adj) {\n  priority_queue<pair<int, int>> pq;\n  while(!pq.empty()) {\n    // ...\n  }\n}`}</code>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 2. Search & Stats Cards Section */}
      <Container disableGutters maxWidth={false}>
        <Stack direction="row" spacing={2}>
          <TextField placeholder="Tìm kiếm bài tập theo tên hoặc chủ đề..." />
          <TextField select defaultValue="popular">
            <MenuItem value="popular">Phổ biến</MenuItem>
          </TextField>
        </Stack>

        <Grid container spacing={2}>
          {problemData.overviewStats.map((stat, index) => (
            <Grid key={index} size={4}>
              <Card>
                <CardContent>
                  <Typography>{stat.title}</Typography>
                  <Typography>{stat.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Challenges Grid Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Danh sách thử thách</Typography>
        <Grid container spacing={2}>
          {problemData.challengesGrid.map((challenge, index) => (
            <Grid key={index} size={4}>
              <Card>
                <CardContent>
                  <Stack direction="row">
                    <Box>{challenge.icon}</Box>
                    <Chip label={challenge.level} size="small" />
                  </Stack>
                  <Typography>{challenge.title}</Typography>
                  <Typography>{challenge.description}</Typography>
                  <Stack direction="row" spacing={1}>
                    {challenge.tags.map((tag, tIdx) => (
                      <Chip
                        key={tIdx}
                        label={tag}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions>
                  <Typography>{challenge.rate}</Typography>
                  <Button variant="contained" size="small">
                    Giải bài
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack direction="row">
          <Pagination count={15} page={1} />
        </Stack>
      </Container>

      {/* 4. Guide Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Cách luyện tập hiệu quả trên LearnFlow</Typography>
        <Typography>
          Phương pháp tiếp cận khoa học giúp bạn nắm vững kiến thức nhanh hơn.
        </Typography>
        <Grid container spacing={2}>
          {problemData.guideSection.map((item, index) => (
            <Grid key={index} size={3}>
              <Card>
                <CardContent>
                  <Box>{item.icon}</Box>
                  <Typography>{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 5. FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Câu hỏi thường gặp</Typography>
        <Box>
          {problemData.faqSection.map((obj, index) => (
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

export default Problem;
