// package com.nanuri.rams.com.utils;

// // import com.nanuri.work.business.member.dto.AttachDTO;
// import com.nanuri.rams.com.exception.AttachFileException;
// import org.apache.commons.io.FilenameUtils;
// import org.springframework.stereotype.Component;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Paths;
// import java.time.LocalDateTime;
// import java.time.format.DateTimeFormatter;
// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.List;
// import java.util.UUID;

// @Component
// public class FileUtils {

//     private final String today = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
//     private final String windowsPath = Paths.get("C:", "Users", "nanuriit", "Desktop", "nanuri-work-img", today).toString();
//     private final String linuxPath = Paths.get("/", "home", "nanuri", "nanuri-work-img", today).toString();

//     private final String getRandomString() {
//         return UUID.randomUUID().toString().replaceAll("-", "");
//     }

//     public List<AttachDTO> uploadFiles(MultipartFile[] files, String userId) {
//         if (files[0].getSize() < 1) {
//             return Collections.emptyList();
//         }
//         String uploadPath = "";
//         List<AttachDTO> attachList = new ArrayList<>();

//         File dir = null;
//         String osName = System.getProperty("os.name").toLowerCase();

//         if (osName.contains("windows")) {
//             dir = new File(windowsPath);
//             uploadPath = windowsPath;
//         } else {
//             dir = new File(linuxPath);
//             uploadPath = linuxPath;
//         }

//         if (dir.exists() == false) {
//             dir.mkdirs();
//         }

//         for (MultipartFile file : files) {
//             try {
//                 final String extension = FilenameUtils.getExtension(file.getOriginalFilename());
//                 final String saveName = getRandomString() + "." + extension;

//                 File target = new File(uploadPath, saveName);
//                 file.transferTo(target);

//                 AttachDTO attach = new AttachDTO();
//                 attach.setUserId(userId);
//                 attach.setOrgnFileNm(file.getOriginalFilename());
//                 attach.setSaveFileNm(saveName);
//                 attach.setSize(file.getSize());

//                 attachList.add(attach);
//             } catch (IOException e) {
//                 throw new AttachFileException("[" + file.getOriginalFilename() + "] failed to save");
//             } catch (Exception e) {
//                 throw new AttachFileException("[" + file.getOriginalFilename() + "] failed to save");
//             }
//         }

//         return attachList;
//     }
// }
