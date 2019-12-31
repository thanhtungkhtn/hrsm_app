import sys
import cv2
import numpy as np
from pylab import imread

def mse(imageA, imageB):
    # the 'Mean Squared Error' between the two images is the
    # sum of the squared difference between the two images;
    # NOTE: the two images must have the same dimension
    err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
    err /= float(imageA.shape[0] * imageA.shape[1])

    # return the MSE, the lower the error, the more "similar"
    # the two images are
    return err

# Read Image
# image_color1 = imread("D:/ExPro/Seminar/Source/backend/uploads/hinhnhanvien.jpg")
# image_color2 = imread("D:/ExPro/Seminar/Source/fontend/vue-admin_fontend/public/img/avatars/hinhnhanvien.jpg")
image_color1 = imread("D:/ExPro/Seminar/Source/backend/uploads/" + sys.argv[1])
image_color2 = imread("D:/ExPro/Seminar/Source/fontend/vue-admin_fontend/public/" + sys.argv[2])

x1 = cv2.cvtColor(image_color1, cv2.COLOR_BGR2GRAY)
x2 = cv2.cvtColor(image_color2, cv2.COLOR_BGR2GRAY)

m = mse(x1, x2)

# def results(IM):
#   msg = "{ width:" + str(IM.shape[1]) + " , height:" + str(IM.shape[0]) + " , channel:" + str(len(IM.shape)) + " , size:" + str(IM.size) + " , mse:" + str(m) + " }"
#   return msg

# print(results(image_color1))

print(m)
