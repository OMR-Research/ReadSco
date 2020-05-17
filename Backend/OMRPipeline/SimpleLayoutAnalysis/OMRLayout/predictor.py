import cv2
from imageio import imread
import numpy as np
from skimage.filters import threshold_sauvola
import io
import base64

class SimpleLayoutAnalysis:

    def __init__(self):
        pass
    
    def predict(self, image):
        img = self.__decodebase64Img(image)
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


        thresh = threshold_sauvola(img_gray, window_size=25)

        binary_img = np.asarray((img_gray < thresh)*255.).astype('uint8')

        erode_img = cv2.erode(binary_img,np.ones((1,20),np.uint8),iterations = 1)

        staff_img = cv2.dilate(erode_img,np.ones((1,20),np.uint8),iterations = 1)
        staff_img = cv2.dilate(staff_img,np.ones((50,1),np.uint8),iterations = 1)

        contours, _ = cv2.findContours(staff_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        img_draw = img.copy()

        definitiveBoundings = []
        for contour in contours:
            if self.isStaff(contour, img.shape):
                x,y,w,h = cv2.boundingRect(contour)
                definitiveBoundings.insert(0,[x,y,w,h])
        
        for bounding in definitiveBoundings:
            print(bounding)

        return definitiveBoundings


    def __decodebase64Img(self, imageToDecode):
        decoded_img = imread(io.BytesIO(base64.b64decode(imageToDecode)))
        return np.array(decoded_img)

    def isStaff(self, contour, img_shape):
        x,y,w,h = cv2.boundingRect(contour)

        cond1 = h < img_shape[0] // 5
        cond2 = cv2.contourArea(contour) > 8000

        return cond1 and cond2
    
    

