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
import Divider from "@mui/material/Divider";

// Data
import { aboutData } from "./data";

function About() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Chip label="Về chúng tôi" variant="contained" />
            <Typography>Kiến tạo tương lai cho lập trình viên Việt</Typography>
            <Typography>
              LearnFlow không chỉ là một nền tảng học tập, mà là bệ phóng cho sự
              nghiệp công nghệ của bạn. Chúng tôi mang đến phương pháp học tập
              cá nhân hóa, giúp bạn vượt qua rào cản và làm chủ mã nguồn một
              cách tự tin nhất.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Khám phá lộ trình</Button>
              <Button variant="outlined">Xem video</Button>
            </Stack>
          </Grid>

          <Grid size={6}>
            <Box component="img" src="" alt="Hero Image"></Box>
          </Grid>
        </Grid>
      </Container>

      {/* Feature Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography>
              LearnFlow là gì? Hệ sinh thái học tập có định hướng
            </Typography>

            {aboutData.featureSection.map((obj, index) => {
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
          </Grid>

          <Grid size={6}>
            <Box component="img" src="" alt=""></Box>
          </Grid>
        </Grid>
      </Container>

      {/* About Section */}
      <Container disableGutters maxWidth={false}>
        {/* Icon */}
        <Typography>Hành trình giải quyết nỗi đau của "Người mới"</Typography>
        <Typography>
          Bạn đã bao giờ dành hàng giờ trên YouTube để xem các video hướng dẫn,
          nhưng khi mở trình soạn thảo mã nguồn lên lại không biết bắt đầu từ
          đâu? Bạn cảm thấy lạc lối giữa hàng nghìn công nghệ mới ra đời mỗi
          ngày?
        </Typography>
        <Typography>
          Đó chính là câu chuyện của đội ngũ sáng lập LearnFlow. Chúng tôi nhận
          ra rằng: **Vấn đề không phải là thiếu tài liệu, mà là thiếu một lộ
          trình đúng đắn và động lực duy trì.** LearnFlow ra đời để biến việc
          học code từ một "cơn ác mộng" thành một hành trình khám phá đầy thú vị
          và có hệ thống.
        </Typography>
        <Divider />
      </Container>

      {/* Future Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {aboutData.futureSection.map((obj, index) => {
            return (
              <Grid size={4}>
                <Box key={index}>
                  {obj.icon}
                  <Typography>{obj.title}</Typography>
                  <Typography>
                    {typeof obj.description === "string"
                      ? obj.description
                      : obj.description.map((item, index) => {
                          return <Typography key={index}>{item}</Typography>;
                        })}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Comparison Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Sự khác biệt tại LearnFlow</Typography>
        <Typography>
          Chúng tôi không chỉ dạy bạn viết code, chúng tôi dạy bạn cách tư duy
          của một kỹ sư phần mềm thực thụ.
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            {aboutData.comparisonSection.disagree.map((item, index) => {
              return <Typography key={index}>{item}</Typography>;
            })}
          </Grid>

          <Grid size={6}>
            {aboutData.comparisonSection.agree.map((item, index) => {
              return <Typography key={index}>{item}</Typography>;
            })}
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Đội ngũ sáng lập</Typography>
        <Typography>
          Những người đứng sau sứ mệnh nâng tầm lập trình viên Việt
        </Typography>
        <Grid container spacing={2}>
          {aboutData.teamSection.map((obj, index) => {
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
                    <Typography gutterBottom variant="h5" component="div">
                      {obj.role}
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
    </Container>
  );
}

export default About;
